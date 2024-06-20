<script>
import {h, onBeforeUnmount, onMounted} from 'vue'
export default {
  props: {
    importance: {
      type: Number,
      default: 1
    },
  },
  setup(props, { attrs }) {

    onMounted(() => console.log('d3-rect mounted'))
    onBeforeUnmount(() => console.log('d3-rect unmounted'))

    return () => h(
        'rect', // type
        { ...attrs }
    )}
}
</script>