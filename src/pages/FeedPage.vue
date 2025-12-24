<template>
  <div class="q-pa-md q-gutter-y-md">
    
    <!-- Filter Bar -->
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h6 text-grey-9 text-weight-bold">Avisos Recientes</div>
      <q-btn-dropdown flat label="Filtrar" icon="filter_list" no-caps>
        <q-list>
          <q-item clickable v-close-popup @click="filter = 'all'">
            <q-item-section>Todos</q-item-section>
          </q-item>
          <q-item clickable v-close-popup @click="filter = 'news'">
            <q-item-section>Noticias</q-item-section>
          </q-item>
           <q-item clickable v-close-popup @click="filter = 'events'">
            <q-item-section>Eventos</q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </div>

    <!-- Feed Cards -->
    <q-card v-for="post in posts" :key="post.id" flat bordered class="my-card q-mb-md">
      <q-item>
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            {{ post.author.charAt(0) }}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-weight-bold">{{ post.title }}</q-item-label>
          <q-item-label caption>{{ post.author }} • {{ formatRelativeTime(post.date) }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-badge :color="getCategoryColor(post.category)" :label="post.category" />
        </q-item-section>
      </q-item>

      <q-separator />

      <q-card-section>
        <div class="text-body2 text-grey-8" style="white-space: pre-line;">
          {{ post.content }}
        </div>
      </q-card-section>

      <!-- Attachments (Images) -->
      <q-card-section v-if="post.images && post.images.length > 0" class="q-pt-none">
        <div class="row q-col-gutter-xs">
          <div class="col-4" v-for="(img, index) in post.images" :key="index">
            <q-img :src="img" :ratio="1" class="rounded-borders" />
          </div>
        </div>
      </q-card-section>

      <!-- Attachments (Files) -->
      <q-card-section v-if="post.files && post.files.length > 0" class="q-pt-none">
         <q-list dense bordered class="rounded-borders">
            <q-item v-for="(file, idx) in post.files" :key="idx" clickable v-ripple>
              <q-item-section avatar>
                <q-icon color="red" name="picture_as_pdf" />
              </q-item-section>
              <q-item-section>{{ file.name }}</q-item-section>
              <q-item-section side>
                <q-icon name="download" color="grey" />
              </q-item-section>
            </q-item>
         </q-list>
      </q-card-section>

      <q-separator />

      <!-- Interaction Bar -->
      <q-card-actions align="right" class="q-px-md">
        <q-btn flat round color="grey" icon="favorite_border" :label="post.likes > 0 ? post.likes : ''" size="sm" />
        <q-btn flat round color="grey" icon="chat_bubble_outline" :label="post.comments > 0 ? post.comments : ''" size="sm" />
        <q-btn flat round color="grey" icon="share" size="sm" />
      </q-card-actions>
    </q-card>

    <!-- FAB for New Post -->
     <q-page-sticky position="bottom-right" :offset="[18, 18]" v-if="$q.screen.gt.sm">
      <q-btn fab icon="add" color="primary" @click="showCreatePost = true" />
    </q-page-sticky>

    <!-- Create Post Dialog -->
    <q-dialog v-model="showCreatePost">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Nuevo Aviso</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-select v-model="newPost.category" :options="['Noticias', 'Eventos', 'Urgente']" label="Categoría" outlined dense class="q-mb-md" />
          <q-input v-model="newPost.title" label="Título" outlined dense class="q-mb-md" />
          <q-input v-model="newPost.content" label="Mensaje" type="textarea" outlined class="q-mb-md" />
          
          <div class="text-caption text-grey q-mb-sm">Adjuntar archivos</div>
          <div class="row q-gutter-sm">
             <q-btn round flat icon="add_photo_alternate" color="primary" />
             <q-btn round flat icon="attach_file" color="primary" />
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn flat label="Publicar" color="primary" v-close-popup @click="createPost" />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useDateFormatter } from 'src/composables/useDateFormatter';
import { useQuasar } from 'quasar';

const { formatRelativeTime } = useDateFormatter();
const $q = useQuasar();

const filter = ref('all');
const showCreatePost = ref(false);

const newPost = ref({
  title: '',
  content: '',
  category: 'Noticias'
});

const posts = ref([
  {
    id: 1,
    author: 'Administración',
    title: 'Mantenimiento de Alberca',
    content: 'Estimados residentes, les informamos que la alberca permanecerá cerrada por mantenimiento los días 25 y 26 de Octubre. Agradecemos su comprensión.',
    date: new Date().toISOString(),
    category: 'Noticias',
    likes: 5,
    comments: 2,
    images: ['https://cdn.quasar.dev/img/parallax2.jpg']
  },
  {
    id: 2,
    author: 'Seguridad',
    title: 'Nuevo Protocolo de Acceso',
    content: 'A partir del lunes, todos los visitantes deberán presentar identificación oficial. Adjuntamos el reglamento actualizado.',
    date: '2023-10-20T10:00:00.000Z',
    category: 'Urgente',
    likes: 12,
    comments: 0,
    files: [{ name: 'Reglamento_2023.pdf' }]
  },
   {
    id: 3,
    author: 'Comité',
    title: 'Fiesta de Halloween',
    content: '¡Están todos invitados a la fiesta de disfraces en el salón de usos múltiples! Habrá premios.',
    date: '2023-10-15T15:30:00.000Z',
    category: 'Eventos',
    likes: 24,
    comments: 8,
    images: []
  }
]);

const getCategoryColor = (cat: string) => {
  if (cat === 'Urgente') return 'red';
  if (cat === 'Eventos') return 'purple';
  return 'blue';
};

const createPost = () => {
  $q.notify({
    message: 'Publicación creada exitosamente',
    color: 'positive',
    icon: 'check_circle'
  });
  // In a real app, we would push to the array or call API
};
</script>

<style scoped>
.my-card {
  border-radius: 16px;
}
</style>
