<script setup>
import {reactive, ref, toValue, watchEffect} from "vue";
import {useElementSize} from "@vueuse/core";
import {useD3Axis} from '../d3-axis.js'
import {useD3Bars} from "../d3-bars";
import {useD3Scales} from "../d3-scales";

const el = ref(null)
const chartEl = ref(null)
const {width, height} = useElementSize(el)

const sample = reactive(
  [
    {
      language: 'Rust',
      value: 78.9,
      color: '#000000'
    },
    {
      language: 'Kotlin',
      value: 75.1,
      color: '#00a2ee'
    },
    {
      language: 'Python',
      value: 68.0,
      color: '#fbcb39'
    },
    {
      language: 'TypeScript',
      value: 67.0,
      color: '#007bc8'
    },
    {
      language: 'Go',
      value: 65.6,
      color: '#65cedb'
    },
    {
      language: 'Swift',
      value: 65.1,
      color: '#ff6e52'
    },
    {
      language: 'JavaScript',
      value: 61.9,
      color: '#f9de3f'
    },
    {
      language: 'C#',
      value: 60.4,
      color: '#5d2f8e'
    },
    {
      language: 'F#',
      value: 59.6,
      color: '#008fc9'
    },
    {
      language: 'Clojure',
      value: 59.6,
      color: '#507dca'
    }
  ]
)

const { xScale, yScale } = useD3Scales(chartEl, sample, width, height)
useD3Axis(chartEl, sample, yScale, xScale, width, height)
useD3Bars(chartEl, sample, yScale, xScale, width, height)

</script>

<template>
  <div ref="el">
    <svg :width="width" :height="height" :viewBox="`0 0 ${width} ${height}`">
      <g ref="chartEl" transform="translate(60, 60)"/>
    </svg>
  </div>
</template>

<style>
svg {
  display: block;
}

div {
  width: 50vw;
  height: 50vh;
  margin: auto;
}
</style>