<template>
  <q-page class="bg-grey-1 q-pb-xl">
    <!-- Header Area -->
    <div class="q-pt-md q-px-md">
      <FinancialSummaryCard 
        :total-balance="summary.totalBalance" 
        :overdue-balance="summary.overdueBalance"
        @pay="handleGlobalPay"
      />
    </div>

    <!-- Filters / Date Range -->
    <div class="q-px-md q-py-sm row items-center justify-between">
      <div class="text-subtitle1 text-weight-bold text-grey-9">Movimientos</div>
      <div class="row q-gutter-xs">
         <q-btn outline dense color="primary" icon="download" label="PDF" no-caps class="rounded-borders" @click="downloadStatement" />
         <q-btn flat dense color="primary" icon="filter_list" label="Filtrar" no-caps class="rounded-borders" />
      </div>
    </div>

    <!-- Transactions List -->
    <div class="q-px-md">
      <q-list separator class="bg-white rounded-borders shadow-1 overflow-hidden">
        <q-item 
          v-for="transaction in transactions" 
          :key="transaction.id"
          clickable
          v-ripple
          @click="openTransactionDetail(transaction)"
          class="q-py-md"
        >
          <!-- Icon/Status Indicator -->
          <q-item-section avatar>
            <q-avatar 
              :color="getStatusColor(transaction.type)" 
              text-color="white" 
              icon="receipt_long" 
              font-size="20px"
            />
          </q-item-section>

          <!-- Main Info -->
          <q-item-section>
            <q-item-label class="text-weight-medium text-grey-9">
              {{ transaction.tagName }}
            </q-item-label>
            <q-item-label caption lines="1">
              {{ transaction.description }}
            </q-item-label>
            <q-item-label caption class="text-grey-6 q-mt-xs">
              {{ formatDate(transaction.date) }}
            </q-item-label>
          </q-item-section>

          <!-- Amount & Status -->
          <q-item-section side>
            <div class="text-weight-bold" :class="getAmountColor(transaction.type)">
              {{ transaction.type === 'payment' || transaction.type === 'discount' ? '-' : '+' }}
              {{ formatCurrency(transaction.amount) }}
            </div>
            <q-badge 
              :color="transaction.status === 'paid' || transaction.status === 'applied' ? 'light-blue-1' : 'orange-1'"
              :text-color="transaction.status === 'paid' || transaction.status === 'applied' ? 'primary' : 'orange-9'"
              class="q-mt-xs"
            >
              {{ transaction.status === 'paid' ? 'Pagado' : transaction.status === 'applied' ? 'Aplicado' : 'Pendiente' }}
            </q-badge>
          </q-item-section>
        </q-item>

        <!-- Loading Skeleton -->
        <template v-if="loading">
          <q-item v-for="n in 3" :key="n">
            <q-item-section avatar><q-skeleton type="QAvatar" /></q-item-section>
            <q-item-section>
              <q-item-label><q-skeleton type="text" /></q-item-label>
              <q-item-label caption><q-skeleton type="text" width="60%" /></q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-list>
    </div>

    <!-- Receipt Detail Dialog -->
    <q-dialog v-model="showDetail" backdrop-filter="blur(4px)">
      <q-card style="width: 100%; max-width: 400px; border-radius: 20px;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6 text-weight-bold">Detalle de Movimiento</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pt-md" v-if="selectedTransaction">
          <div class="text-center q-mb-lg">
            <div class="text-h4 text-weight-bold text-primary">
              {{ formatCurrency(selectedTransaction.amount) }}
            </div>
            <div class="text-subtitle2 text-grey-7">{{ selectedTransaction.tagName }}</div>
          </div>

          <q-list padding class="rounded-borders bg-grey-1">
            <q-item>
              <q-item-section>
                <q-item-label caption>Fecha</q-item-label>
                <q-item-label>{{ formatDate(selectedTransaction.date) }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label caption>Descripción</q-item-label>
                <q-item-label>{{ selectedTransaction.description }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label caption>Estado</q-item-label>
                <q-item-label class="text-capitalize">{{ selectedTransaction.status }}</q-item-label>
              </q-item-section>
            </q-item>
             <q-item>
              <q-item-section>
                <q-item-label caption>ID Transacción</q-item-label>
                <q-item-label class="text-mono text-caption">{{ selectedTransaction.id }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>

          <div class="q-mt-lg" v-if="selectedTransaction.status === 'pending'">
             <q-btn 
                color="primary" 
                class="full-width rounded-borders shadow-2" 
                label="Pagar Este Concepto" 
                size="lg"
                no-caps
                @click="paySingle(selectedTransaction.id)"
                :loading="processingPayment"
             />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { MockFinanceService, type Transaction, type AccountSummary } from 'src/services/mock/MockFinanceService';
import FinancialSummaryCard from 'src/components/FinancialSummaryCard.vue';
import { useCurrencyFormatter } from 'src/composables/useCurrencyFormatter';
import { useDateFormatter } from 'src/composables/useDateFormatter';

const $q = useQuasar();
const { formatCurrency } = useCurrencyFormatter();
const { formatDate } = useDateFormatter();

const transactions = ref<Transaction[]>([]);
const summary = ref<AccountSummary>({ totalBalance: 0, overdueBalance: 0, lastUpdated: '' });
const loading = ref(true);
const showDetail = ref(false);
const selectedTransaction = ref<Transaction | null>(null);
const processingPayment = ref(false);

const loadData = async () => {
  loading.value = true;
  try {
    const [summaryData, txData] = await Promise.all([
      MockFinanceService.getAccountSummary(),
      MockFinanceService.getTransactions()
    ]);
    summary.value = summaryData;
    transactions.value = txData;
  } catch (error) {
    console.error('Error loading data', error);
    $q.notify({ type: 'negative', message: 'Error al cargar datos' });
  } finally {
    loading.value = false;
  }
};

const getStatusColor = (type: string) => {
  switch (type) {
    case 'payment': return 'green-6';
    case 'charge': return 'orange-8';
    case 'penalty': return 'red-8';
    case 'discount': return 'blue-6';
    default: return 'grey';
  }
};

const getAmountColor = (type: string) => {
  if (type === 'payment' || type === 'discount') return 'text-green-7';
  return 'text-grey-9';
};

const openTransactionDetail = (tx: Transaction) => {
  selectedTransaction.value = tx;
  showDetail.value = true;
};

const handleGlobalPay = () => {
  // Simulates paying the total balance
  $q.dialog({
    title: 'Confirmar Pago Total',
    message: `¿Desea pagar el saldo total de ${formatCurrency(summary.value.totalBalance)}?`,
    cancel: true,
    persistent: true
  }).onOk(() => {
    processPayment('global');
  });
};

const paySingle = (id: string) => {
   processPayment(id);
};

const processPayment = async (id: string) => {
  processingPayment.value = true;
  if (id === 'global') $q.loading.show({ message: 'Procesando pago seguro...' });
  
  try {
    await MockFinanceService.payTransaction(id); // Using the mock service
    
    // Simulate success
    $q.notify({
      type: 'positive',
      message: 'Pago realizado con éxito',
      icon: 'check_circle',
      position: 'top'
    });
    
    showDetail.value = false;
    // Refresh data
    await loadData();
    
  } catch (error) {
    $q.notify({ type: 'negative', message: 'Error en el pago' });
  } finally {
    $q.loading.hide();
    processingPayment.value = false;
  }
};

onMounted(() => {
  loadData();
});
</script>

<style scoped>
.rounded-borders {
  border-radius: 16px !important;
}
</style>
