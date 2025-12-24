<template>
  <q-page class="bg-grey-1 q-pb-xl">
    
    <div class="q-px-md q-pt-md">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="pending" label="Pendientes" icon="pending_actions" />
        <q-tab name="process" label="En Proceso" icon="engineering" />
        <q-tab name="closed" label="Cerrados" icon="task_alt" />
      </q-tabs>

      <q-tab-panels v-model="tab" animated class="bg-transparent q-mt-md">
        
        <!-- PENDING PANEL -->
        <q-tab-panel name="pending" class="q-pa-none">
          <q-list class="q-gutter-y-md">
            <q-card v-for="ticket in pendingTickets" :key="ticket.id" flat bordered class="rounded-borders">
              <q-item>
                <q-item-section avatar>
                  <q-avatar color="orange-1" text-color="orange-9" icon="report_problem" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-weight-bold">{{ ticket.title }}</q-item-label>
                  <q-item-label caption>{{ ticket.area }} • {{ ticket.date }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-chip size="sm" color="orange-2" text-color="orange-9">Pendiente</q-chip>
                </q-item-section>
              </q-item>
            </q-card>
          </q-list>
          
          <div v-if="pendingTickets.length === 0" class="text-center q-pa-xl text-grey">
            <q-icon name="check_circle" size="4rem" color="grey-4" />
            <div class="q-mt-sm">No hay solicitudes pendientes</div>
          </div>
        </q-tab-panel>

        <!-- IN PROCESS PANEL -->
        <q-tab-panel name="process" class="q-pa-none">
           <q-list class="q-gutter-y-md">
            <q-card v-for="ticket in processTickets" :key="ticket.id" flat bordered class="rounded-borders">
              <q-item>
                <q-item-section avatar>
                  <q-avatar color="blue-1" text-color="blue-9" icon="build" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-weight-bold">{{ ticket.title }}</q-item-label>
                  <q-item-label caption>{{ ticket.area }} • {{ ticket.date }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-chip size="sm" color="blue-2" text-color="blue-9">En Proceso</q-chip>
                </q-item-section>
              </q-item>
              <q-separator />
              <q-card-section class="q-py-sm bg-grey-1">
                 <div class="text-caption text-grey-8">
                   <q-icon name="info" class="q-mr-xs" />
                   Personal de mantenimiento asignado: <strong>Juan Pérez</strong>
                 </div>
              </q-card-section>
            </q-card>
          </q-list>
        </q-tab-panel>

        <!-- CLOSED PANEL -->
        <q-tab-panel name="closed" class="q-pa-none">
           <q-list class="q-gutter-y-md">
            <q-card v-for="ticket in closedTickets" :key="ticket.id" flat bordered class="rounded-borders opacity-60">
              <q-item>
                <q-item-section avatar>
                  <q-avatar color="green-1" text-color="green-9" icon="check" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-weight-bold text-strike">{{ ticket.title }}</q-item-label>
                  <q-item-label caption>{{ ticket.area }} • {{ ticket.date }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-chip size="sm" color="green-2" text-color="green-9">Resuelto</q-chip>
                </q-item-section>
              </q-item>
            </q-card>
          </q-list>
        </q-tab-panel>

      </q-tab-panels>
    </div>

    <!-- Create Ticket Dialog (opened from main layout FAB) -->

    <q-dialog v-model="showCreate" position="bottom">
      <q-card style="width: 100%; border-radius: 20px 20px 0 0;">
        <q-card-section>
          <div class="text-h6">Nueva Solicitud</div>
        </q-card-section>
        
        <q-card-section class="q-pt-none q-gutter-y-md">
           <q-select 
            v-model="newTicket.area" 
            :options="['Áreas Comunes', 'Elevadores', 'Limpieza', 'Seguridad', 'Jardinería']" 
            label="Área" 
            outlined 
            dense
            options-dense
          >
            <template v-slot:prepend><q-icon name="category" /></template>
          </q-select>

          <q-input v-model="newTicket.title" label="Asunto (ej. Foco fundido)" outlined dense />
          
          <q-input 
            v-model="newTicket.description" 
            label="Descripción del problema" 
            type="textarea" 
            outlined 
            rows="3"
          />

          <!-- Photo Evidence -->
          <div class="row items-center q-gutter-x-md">
            <q-btn round outline color="grey-7" icon="camera_alt" />
            <q-btn round outline color="grey-7" icon="image" />
            <div class="text-caption text-grey">Adjuntar evidencia (Opcional)</div>
          </div>

          <q-btn 
            label="Enviar Solicitud" 
            color="primary" 
            class="full-width q-mt-md rounded-borders shadow-2" 
            size="lg"
            no-caps
            @click="submitTicket"
          />
        </q-card-section>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const tab = ref('pending');
const showCreate = ref(false);

const newTicket = ref({
  area: '',
  title: '',
  description: ''
});

// Mock Data
const pendingTickets = ref([
  { id: 1, title: 'Foco fundido en pasillo', area: 'Áreas Comunes', date: 'Hace 2 horas' },
  { id: 2, title: 'Mancha en alfombra', area: 'Limpieza', date: 'Ayer' }
]);

const processTickets = ref([
  { id: 3, title: 'Mantenimiento Elevador B', area: 'Elevadores', date: 'Hace 1 día' }
]);

const closedTickets = ref([
  { id: 4, title: 'Ruido excesivo 502', area: 'Seguridad', date: 'Semana pasada' }
]);

const submitTicket = () => {
  if (!newTicket.value.title || !newTicket.value.area) {
    $q.notify({ type: 'warning', message: 'Por favor complete los campos obligatorios' });
    return;
  }

  $q.loading.show({ message: 'Enviando reporte...' });
  setTimeout(() => {
    $q.loading.hide();
    pendingTickets.value.unshift({
      id: Date.now(),
      title: newTicket.value.title,
      area: newTicket.value.area,
      date: 'Ahora mismo'
    });
    
    showCreate.value = false;
    newTicket.value = { area: '', title: '', description: '' };
    
    $q.notify({ type: 'positive', message: 'Solicitud enviada correctamente', icon: 'check_circle' });
  }, 1000);
};
</script>

<style scoped>
.rounded-borders {
  border-radius: 12px;
}
.opacity-60 {
  opacity: 0.6;
}
</style>
