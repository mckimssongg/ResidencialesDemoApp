<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="my-card financial-card full-width" flat bordered>
      <q-card-section class="bg-primary text-white q-pa-lg relative-position overflow-hidden">
        <!-- Decorative circle -->
        <div class="decorative-circle"></div>
        
        <div class="text-subtitle2 text-uppercase q-mb-xs opacity-80">Saldo Total</div>
        <div class="text-h3 text-weight-bold q-mb-md">
          {{ formatCurrency(totalBalance) }}
        </div>
        
        <div class="row items-center justify-between">
          <div class="row items-center">
            <q-icon name="warning" class="q-mr-xs text-orange-3" size="xs" v-if="overdueBalance > 0" />
            <span class="text-caption">
              Vencido: {{ formatCurrency(overdueBalance) }}
            </span>
          </div>
          <q-btn 
            flat 
            dense 
            label="Pagar Ahora" 
            color="white" 
            class="q-px-md payment-btn" 
            no-caps
            @click="$emit('pay')"
          />
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { useCurrencyFormatter } from 'src/composables/useCurrencyFormatter';

interface Props {
  totalBalance: number;
  overdueBalance: number;
}

defineProps<Props>();
defineEmits(['pay']);

const { formatCurrency } = useCurrencyFormatter();
</script>

<style scoped lang="scss">
.financial-card {
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 10px 30px -10px rgba(46, 125, 50, 0.3); // Deep Green shadow
  border: none;
}

.bg-primary {
  background: linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%) !important;
}

.decorative-circle {
  position: absolute;
  top: -50px;
  right: -50px;
  width: 150px;
  height: 150px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  pointer-events: none;
}

.payment-btn {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  font-weight: 600;
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
  
  &:active {
    transform: scale(0.95);
    background: rgba(255, 255, 255, 0.3);
  }
}

.opacity-80 {
  opacity: 0.8;
}
</style>
