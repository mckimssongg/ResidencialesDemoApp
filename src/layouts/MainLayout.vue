<template>
  <q-layout view="lHh Lpr lFf" class="bg-grey-1">
    
    <!-- WEB HEADER (Desktop) -->
    <q-header v-if="$q.screen.gt.xs" elevated class="bg-white text-dark q-py-xs" height-hint="64">
      <q-toolbar class="constrained-width q-mx-auto">
        <q-btn flat dense round icon="menu" aria-label="Menu" class="q-mr-sm" @click="toggleLeftDrawer" />
        
        <q-avatar size="36px" color="primary" text-color="white" font-size="20px">RP</q-avatar>
        <q-toolbar-title class="text-weight-bold text-primary">Residenciales Patos</q-toolbar-title>

        <q-space />

        <!-- Desktop Navigation -->
        <div class="q-gutter-sm row items-center">
          <q-btn flat round icon="notifications_none" color="grey-8" to="/notificaciones">
            <q-badge color="red" floating rounded mini />
          </q-btn>
          <q-btn flat round>
             <q-avatar size="32px">
               <img src="https://cdn.quasar.dev/img/avatar.png">
             </q-avatar>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <!-- MOBILE HEADER (Simple) -->
    <q-header v-else bordered class="bg-white text-dark safe-area-top">
      <q-toolbar>
        <q-btn flat round dense icon="menu" class="q-mr-sm" @click="toggleLeftDrawer" />
        <q-toolbar-title class="text-weight-bold text-primary text-center">Residenciales Patos</q-toolbar-title>
        <q-btn flat round dense icon="notifications_none" to="/notificaciones">
           <q-badge color="red" floating rounded mini />
        </q-btn>
      </q-toolbar>
    </q-header>

    <!-- DRAWER (Sidebar) -->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-grey-1 safe-area-top"
    >
      <q-list>
        <q-item-label header class="text-grey-8">
          Menú Principal
        </q-item-label>

        <q-item clickable v-ripple to="/" exact>
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>Inicio / Avisos</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/finanzas">
          <q-item-section avatar>
            <q-icon name="account_balance_wallet" />
          </q-item-section>
          <q-item-section>Finanzas</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/solicitudes">
          <q-item-section avatar>
            <q-icon name="assignment" />
          </q-item-section>
          <q-item-section>Solicitudes</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/reservas">
          <q-item-section avatar>
            <q-icon name="event_available" />
          </q-item-section>
          <q-item-section>Reservas</q-item-section>
        </q-item>
        
        <q-item clickable v-ripple to="/seguridad">
          <q-item-section avatar>
            <q-icon name="security" />
          </q-item-section>
          <q-item-section>Seguridad</q-item-section>
        </q-item>

        <q-separator class="q-my-md" />

        <q-item-label header class="text-grey-8">
          Configuración
        </q-item-label>
        
         <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="settings" />
          </q-item-section>
          <q-item-section>Ajustes</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <div class="constrained-width q-mx-auto">
         <router-view v-slot="{ Component }">
          <keep-alive include="Dashboard,FinancialSummary,RequestsPage">
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </div>
    </q-page-container>

    <!-- MOBILE BOTTOM NAVIGATION -->
    <q-footer v-if="$q.screen.lt.sm" bordered class="bg-white text-primary">
      <q-tabs 
        v-model="tab" 
        indicator-color="transparent" 
        active-color="primary" 
        class="text-grey-6"
        align="justify"
      >
        <q-route-tab name="home" icon="home" to="/" exact no-caps />
        <q-route-tab name="requests" icon="assignment" to="/solicitudes" no-caps />
        
        <!-- Empty Tab for FAB space -->
        <q-tab disable style="width: 50px;" />

        <q-route-tab name="finance" icon="attach_money" to="/finanzas" no-caps />
        <q-route-tab name="notifications" icon="notifications" to="/notificaciones" no-caps />
      </q-tabs>
    </q-footer>

    <!-- FAB Floating above Footer (only on mobile) -->
    <q-page-sticky v-if="$q.screen.lt.sm" position="bottom" :offset="[0, -38]" style="z-index: 2500">
      <q-btn
        fab
        icon="add"
        color="primary"
        class="shadow-3"
        @click="openCreateMenu"
      />
    </q-page-sticky>

    <!-- ===================== MODALS ===================== -->
    
    <!-- Modal: Nuevo Aviso -->
    <q-dialog v-model="showPostModal" position="bottom">
      <q-card style="width: 100%; max-width: 500px; border-radius: 20px 20px 0 0;">
        <q-card-section class="row items-center">
          <div class="text-h6">Nuevo Aviso</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pt-none q-gutter-y-md">
          <q-select 
            v-model="newPost.category" 
            :options="['Noticias', 'Eventos', 'Urgente']" 
            label="Categoría" 
            outlined 
            dense
          >
            <template v-slot:prepend><q-icon name="label" /></template>
          </q-select>

          <q-input v-model="newPost.title" label="Título del aviso" outlined dense>
            <template v-slot:prepend><q-icon name="title" /></template>
          </q-input>
          
          <q-input 
            v-model="newPost.content" 
            label="Contenido del mensaje" 
            type="textarea" 
            outlined 
            rows="4"
          />

          <div class="row items-center q-gutter-x-md">
            <q-btn round outline color="primary" icon="add_photo_alternate" />
            <q-btn round outline color="primary" icon="attach_file" />
            <span class="text-caption text-grey">Adjuntar archivos</span>
          </div>

          <q-btn 
            label="Publicar Aviso" 
            color="primary" 
            class="full-width q-mt-md" 
            size="lg"
            no-caps
            @click="submitPost"
          />
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Modal: Nueva Solicitud -->
    <q-dialog v-model="showTicketModal" position="bottom">
      <q-card style="width: 100%; max-width: 500px; border-radius: 20px 20px 0 0;">
        <q-card-section class="row items-center">
          <div class="text-h6">Nueva Solicitud</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pt-none q-gutter-y-md">
          <q-select 
            v-model="newTicket.area" 
            :options="['Áreas Comunes', 'Elevadores', 'Limpieza', 'Seguridad', 'Jardinería']" 
            label="Área" 
            outlined 
            dense
          >
            <template v-slot:prepend><q-icon name="category" /></template>
          </q-select>

          <q-input v-model="newTicket.title" label="Asunto (ej. Foco fundido)" outlined dense>
            <template v-slot:prepend><q-icon name="report_problem" /></template>
          </q-input>
          
          <q-input 
            v-model="newTicket.description" 
            label="Descripción del problema" 
            type="textarea" 
            outlined 
            rows="3"
          />

          <div class="row items-center q-gutter-x-md">
            <q-btn round outline color="orange" icon="camera_alt" />
            <q-btn round outline color="orange" icon="image" />
            <span class="text-caption text-grey">Adjuntar evidencia</span>
          </div>

          <q-btn 
            label="Enviar Solicitud" 
            color="orange" 
            class="full-width q-mt-md" 
            size="lg"
            no-caps
            @click="submitTicket"
          />
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Modal: Reservar -->
    <q-dialog v-model="showReserveModal" position="bottom">
      <q-card style="width: 100%; max-width: 500px; border-radius: 20px 20px 0 0;">
        <q-card-section class="row items-center">
          <div class="text-h6">Nueva Reservación</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pt-none q-gutter-y-md">
          <q-select 
            v-model="newReservation.area" 
            :options="['Cancha de Paddle', 'Alberca', 'Salón de Eventos', 'Gimnasio']" 
            label="Instalación" 
            outlined 
            dense
          >
            <template v-slot:prepend><q-icon name="place" /></template>
          </q-select>

          <q-input v-model="newReservation.date" label="Fecha" outlined dense type="date">
            <template v-slot:prepend><q-icon name="event" /></template>
          </q-input>
          
          <div class="row q-gutter-sm">
            <q-input v-model="newReservation.startTime" label="Hora inicio" outlined dense type="time" class="col" />
            <q-input v-model="newReservation.endTime" label="Hora fin" outlined dense type="time" class="col" />
          </div>

          <q-input 
            v-model="newReservation.notes" 
            label="Notas adicionales (opcional)" 
            outlined 
            dense
          />

          <q-btn 
            label="Confirmar Reservación" 
            color="green" 
            class="full-width q-mt-md" 
            size="lg"
            no-caps
            @click="submitReservation"
          />
        </q-card-section>
      </q-card>
    </q-dialog>

  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const tab = ref('home');
const leftDrawerOpen = ref(false);

// Modal states
const showPostModal = ref(false);
const showTicketModal = ref(false);
const showReserveModal = ref(false);

// Form data
const newPost = ref({
  category: 'Noticias',
  title: '',
  content: ''
});

const newTicket = ref({
  area: '',
  title: '',
  description: ''
});

const newReservation = ref({
  area: '',
  date: '',
  startTime: '',
  endTime: '',
  notes: ''
});

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const openCreateMenu = () => {
  $q.bottomSheet({
    message: '¿Qué deseas crear?',
    actions: [
      {
        label: 'Nuevo Aviso',
        icon: 'campaign',
        color: 'primary',
        id: 'post'
      },
      {
        label: 'Nueva Solicitud',
        icon: 'build',
        color: 'orange',
        id: 'ticket'
      },
       {
        label: 'Reservar',
        icon: 'event',
        color: 'green',
        id: 'reserve'
      }
    ]
  }).onOk(action => {
    if (action.id === 'post') {
      showPostModal.value = true;
    } else if (action.id === 'ticket') {
      showTicketModal.value = true;
    } else if (action.id === 'reserve') {
      showReserveModal.value = true;
    }
  });
};

const submitPost = () => {
  if (!newPost.value.title) {
    $q.notify({ type: 'warning', message: 'Por favor ingrese un título' });
    return;
  }
  showPostModal.value = false;
  $q.notify({ type: 'positive', message: 'Aviso publicado exitosamente', icon: 'check_circle' });
  newPost.value = { category: 'Noticias', title: '', content: '' };
};

const submitTicket = () => {
  if (!newTicket.value.title || !newTicket.value.area) {
    $q.notify({ type: 'warning', message: 'Por favor complete los campos obligatorios' });
    return;
  }
  showTicketModal.value = false;
  $q.notify({ type: 'positive', message: 'Solicitud enviada correctamente', icon: 'check_circle' });
  newTicket.value = { area: '', title: '', description: '' };
};

const submitReservation = () => {
  if (!newReservation.value.area || !newReservation.value.date) {
    $q.notify({ type: 'warning', message: 'Por favor seleccione instalación y fecha' });
    return;
  }
  showReserveModal.value = false;
  $q.notify({ type: 'positive', message: 'Reservación confirmada', icon: 'event_available' });
  newReservation.value = { area: '', date: '', startTime: '', endTime: '', notes: '' };
};

</script>

<style lang="scss" scoped>
.constrained-width {
  width: 100%;
  max-width: 800px; /* Social Feed style width */
}

/* Customizing Tabs to look modern */
:deep(.q-tab__icon) {
  font-size: 24px;
}

:deep(.q-tab--active .q-tab__icon) {
  /* Filled icon variant simulation or just bold color */
  transform: scale(1.1);
  transition: transform 0.2s;
}

/* Header tweaks */
.safe-area-top {
  padding-top: env(safe-area-inset-top);
  height: auto;
}

.q-header {
  border-bottom: 1px solid rgba(0,0,0,0.05);
  box-shadow: none;
}

/* Footer tweaks */
.q-footer {
  padding-bottom: env(safe-area-inset-bottom);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0 -5px 15px rgba(0,0,0,0.05);
}
</style>
