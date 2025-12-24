<template>
  <q-page class="q-pa-md bg-grey-1">
    
    <!-- User Profile Card -->
    <q-card class="my-card q-mb-lg rounded-borders bg-white" flat bordered>
      <q-item>
        <q-item-section avatar>
          <q-avatar size="60px">
            <img src="https://images.unsplash.com/photo-1459682687441-7761439a709d?w=150&h=150&fit=crop">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-h6 text-weight-bold">Juan Pérez</q-item-label>
          <q-item-label caption class="text-subtitle2 text-primary">Torre 1 - Depto 101</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-btn flat round icon="edit" color="grey" />
        </q-item-section>
      </q-item>
    </q-card>

    <div class="text-h6 text-weight-bold q-mb-md text-grey-9">Directorio de Emergencia</div>

    <!-- Emergency Buttons -->
    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-6">
        <q-btn 
          color="negative" 
          class="full-width rounded-borders shadow-3 q-py-md" 
          no-caps
          @click="call('security')"
        >
          <div class="row items-center justify-center full-width">
            <q-icon name="local_police" size="md" class="q-mr-sm" />
            <div class="text-left">
              <div class="text-weight-bold text-subtitle1">Vigilancia (Caseta)</div>
              <div class="text-caption text-white">Disponible 24/7</div>
            </div>
          </div>
        </q-btn>
      </div>

      <div class="col-12 col-md-6">
        <q-btn 
          color="primary" 
          class="full-width rounded-borders shadow-3 q-py-md" 
          no-caps
          @click="call('admin')"
        >
          <div class="row items-center justify-center full-width">
            <q-icon name="business" size="md" class="q-mr-sm" />
            <div class="text-left">
              <div class="text-weight-bold text-subtitle1">Administración</div>
              <div class="text-caption text-white">Lun-Vie 9:00 - 18:00</div>
            </div>
          </div>
        </q-btn>
      </div>
    </div>

    <!-- Notification Settings (Mock) -->
    <div class="q-mt-xl">
      <div class="text-h6 text-weight-bold q-mb-md text-grey-9">Configuración de Alertas</div>
      <q-list bordered class="rounded-borders bg-white">
        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-item-label>Notificaciones Push</q-item-label>
            <q-item-label caption>Recibir avisos en tiempo real</q-item-label>
          </q-item-section>
          <q-item-section side >
            <q-toggle color="primary" v-model="notifications" />
          </q-item-section>
        </q-item>

        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-item-label>Alertas de Cobro</q-item-label>
            <q-item-label caption>Recordatorios de pago vencido</q-item-label>
          </q-item-section>
          <q-item-section side >
            <q-toggle color="primary" v-model="paymentAlerts" />
          </q-item-section>
        </q-item>
      </q-list>
    </div>

  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const notifications = ref(true);
const paymentAlerts = ref(true);

const call = (target: string) => {
  const number = target === 'security' ? '55-1234-5678' : '55-8765-4321';
  $q.dialog({
    title: 'Llamar',
    message: `¿Desea llamar a ${target === 'security' ? 'Vigilancia' : 'Administración'} (${number})?`,
    cancel: true,
    persistent: true
  }).onOk(() => {
    window.location.href = `tel:${number}`;
  });
};
</script>

<style scoped>
.rounded-borders {
  border-radius: 16px;
}
</style>
