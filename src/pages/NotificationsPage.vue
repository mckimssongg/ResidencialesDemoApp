<template>
  <q-page class="q-pa-md bg-grey-1">
    <div class="text-h6 text-weight-bold q-mb-md text-grey-9">Notificaciones</div>
    
    <q-list separator class="bg-white rounded-borders shadow-1">
      <q-item clickable v-ripple v-for="n in 5" :key="n" class="q-py-md">
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white" icon="notifications" />
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-weight-bold">Nuevo Aviso Publicado</q-item-label>
          <q-item-label caption lines="2">La administración ha publicado un nuevo aviso sobre el mantenimiento...</q-item-label>
          <q-item-label caption class="text-grey-5 q-mt-xs">Hace {{ n * 5 }} min</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="circle" color="primary" size="xs" v-if="n < 3" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script setup lang="ts">
</script>

<style scoped>
.rounded-borders {
  border-radius: 16px;
}
</style>
