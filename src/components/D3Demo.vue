<script setup>
import {ref, toValue, watchEffect} from "vue";
import {useElementSize} from "@vueuse/core";
import { useD3 } from '../d3-demo.js'

const el = ref(null)
const svgEl = ref(null)
const { width, height } = useElementSize(el)

const { bottom_axis } = useD3(svgEl, width)

</script>

<template>
  <div ref="el">
    <svg ref="svgEl" :width="width" :height="height" :viewBox="`0 0 ${width} ${height}`">

    </svg>
  </div>
</template>

<style>
svg {
  display:block;
}
div {
  background-color: aliceblue;
  width: 100vw;
  height: 100vh;
}
</style>