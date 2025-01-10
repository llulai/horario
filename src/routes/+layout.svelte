<script lang="ts">
  import '../app.css';
  let { children } = $props();
</script>

<div class="flex h-20 flex-row items-center justify-between border-b border-gray-200 px-6">
  <div class="text-[24px]">Super Horario</div>
  <div class="flex flex-row items-center gap-6 text-[14px]">
    <div>Asignaturas</div>
    <div>Profesores</div>
    <div>Cursos</div>
    <div>Clases</div>
  </div>
</div>
{@render children()}
