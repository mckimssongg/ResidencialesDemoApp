<template>
  <q-page class="bg-grey-1">
    
    <!-- Facility Carousel - Premium Design -->
    <div class="q-pa-md carousel-section">
      <div class="text-h6 text-weight-bold q-mb-md text-grey-9">Nuestras Instalaciones</div>
      
      <div class="carousel-wrapper">
        <q-carousel
          ref="carousel"
          v-model="slide"
          transition-prev="slide-right"
          transition-next="slide-left"
          swipeable
          animated
          infinite
          height="220px"
          class="carousel-senior"
        >
          <q-carousel-slide name="paddle" class="q-pa-none">
            <div class="slide-content img-bg-paddle">
              <div class="glass-caption">
                <div class="q-mb-xs">
                  <q-badge color="green-1" text-color="green-9" class="status-badge">
                    <q-icon name="circle" size="8px" class="q-mr-xs" />
                    Disponible
                  </q-badge>
                </div>
                <div class="text-h6 text-weight-bolder">Cancha de Paddle</div>
                <div class="text-caption opacity-80">
                  <q-icon name="access_time" size="14px" class="q-mr-xs" />
                  07:00 - 22:00
                </div>
              </div>
            </div>
          </q-carousel-slide>
          
          <q-carousel-slide name="pool" class="q-pa-none">
            <div class="slide-content img-bg-pool">
              <div class="glass-caption">
                <div class="q-mb-xs">
                  <q-badge color="orange-1" text-color="orange-9" class="status-badge">
                    <q-icon name="error_outline" size="12px" class="q-mr-xs" />
                    Mantenimiento Lunes
                  </q-badge>
                </div>
                <div class="text-h6 text-weight-bolder">Alberca</div>
                <div class="text-caption opacity-80">
                  <q-icon name="access_time" size="14px" class="q-mr-xs" />
                  08:00 - 20:00
                </div>
              </div>
            </div>
          </q-carousel-slide>
          
          <q-carousel-slide name="lounge" class="q-pa-none">
            <div class="slide-content img-bg-lounge">
              <div class="glass-caption">
                <div class="q-mb-xs">
                  <q-badge color="blue-1" text-color="blue-9" class="status-badge">
                    <q-icon name="info" size="12px" class="q-mr-xs" />
                    Requiere depósito
                  </q-badge>
                </div>
                <div class="text-h6 text-weight-bolder">Salón de Usos Múltiples</div>
                <div class="text-caption opacity-80">
                  <q-icon name="event_seat" size="14px" class="q-mr-xs" />
                  Previa reservación
                </div>
              </div>
            </div>
          </q-carousel-slide>
        </q-carousel>
        
        <!-- Custom Navigation Controls -->
        <q-btn flat round color="white" icon="chevron_left" class="nav-btn prev-btn" @click="$refs.carousel.previous()" />
        <q-btn flat round color="white" icon="chevron_right" class="nav-btn next-btn" @click="$refs.carousel.next()" />
        
        <!-- External Navigation Dots -->
        <div class="carousel-dots q-mt-md">
          <span 
            v-for="facility in ['paddle', 'pool', 'lounge']" 
            :key="facility"
            :class="['dot', { active: slide === facility }]"
            @click="slide = facility"
          />
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="row q-px-md q-gutter-sm justify-between">
       <q-btn outline color="primary" icon="description" label="Reglamento" class="col rounded-borders" @click="showRules = true" />
       <q-btn outline color="primary" icon="schedule" label="Horarios" class="col rounded-borders" />
    </div>

    <!-- Calendar Section -->
    <div class="q-pa-md">
      <q-card class="my-card rounded-borders" flat>
        <q-card-section>
          <div class="text-subtitle1 text-weight-bold q-mb-sm">Selecciona una fecha</div>
          <div class="row justify-center">
            <q-date
              v-model="date"
              :events="events"
              event-color="orange"
              minimal
              flat
              class="full-width"
              locale="es"
              :options="dateOptions"
            />
          </div>
        </q-card-section>
        
        <q-separator />
        
        <q-card-actions align="center" class="q-pa-md">
          <q-btn 
            color="primary" 
            label="Reservar Instalación" 
            icon-right="event" 
            class="full-width rounded-borders shadow-2" 
            size="lg"
            no-caps
            :disable="!date"
            @click="confirmReservation"
          />
        </q-card-actions>
      </q-card>
    </div>

    <!-- Rules Dialog -->
    <q-dialog v-model="showRules">
      <q-card>
        <q-card-section>
          <div class="text-h6">Reglamento de Uso</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <ul>
            <li>Respetar el horario reservado.</li>
            <li>Uso obligatorio de ropa deportiva.</li>
            <li>Prohibido ingerir alimentos en la cancha.</li>
            <li>Cancelaciones con 24h de anticipación.</li>
          </ul>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Entendido" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const slide = ref('paddle');
const date = ref('');
const showRules = ref(false);

// Mock occupied dates
const events = [ '2025/02/20', '2025/02/21', '2025/02/25' ];

// Disable past dates
const dateOptions = (dateStr: string) => {
  return dateStr >= new Date().toISOString().split('T')[0].replace(/-/g, '/');
};

const confirmReservation = () => {
  $q.dialog({
    title: 'Confirmar Reserva',
    message: `¿Desea reservar la ${slide.value === 'paddle' ? 'Cancha de Paddle' : slide.value} para el día ${date.value}?`,
    cancel: true,
    persistent: true
  }).onOk(() => {
    $q.loading.show();
    setTimeout(() => {
       $q.loading.hide();
       $q.notify({ type: 'positive', message: 'Reserva confirmada. ¡Disfruta!', icon: 'check_circle' });
       date.value = '';
    }, 1500);
  });
};
</script>

<style scoped>
.rounded-borders {
  border-radius: 16px;
}

/* ========== Senior Carousel Styles ========== */
.carousel-wrapper {
  position: relative;
  border-radius: 24px;
}

.carousel-senior {
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.12);
}

.slide-content {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  position: relative;
}

/* Senior Glassmorphism Overlay */
.glass-caption {
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
  padding: 18px 22px;
  background: rgba(20, 20, 20, 0.4);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: white;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.status-badge {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 8px;
}

.text-h6 {
  font-size: 1.25rem;
  letter-spacing: -0.02em;
  margin-bottom: 4px;
}

.opacity-80 {
  opacity: 0.8;
}

/* Minimalist Nav Controls */
.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  width: 48px;
  height: 48px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  opacity: 0.15; /* Casi invisibles por defecto */
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.carousel-wrapper:hover .nav-btn {
  opacity: 1; /* Aparecen al pasar el mouse por el carrusel */
}

.nav-btn:hover {
  background: rgba(255, 255, 255, 0.7);
  transform: translateY(-50%) scale(1.1);
}

@media (max-width: 599px) {
  .nav-btn {
    display: none !important;
  }
}

.prev-btn { left: 16px; }
.next-btn { right: 16px; }

/* ========== Senior Navigation Dots ========== */
.carousel-dots {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #e0e0e0;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.dot.active {
  background: #1976d2;
  width: 24px;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(25, 118, 210, 0.3);
}

/* Background Images */
.img-bg-paddle { background-image: url('https://cdn.quasar.dev/img/parallax1.jpg'); }
.img-bg-pool { background-image: url('https://cdn.quasar.dev/img/parallax2.jpg'); }
.img-bg-lounge { background-image: url('https://cdn.quasar.dev/img/mountains.jpg'); }
</style>
