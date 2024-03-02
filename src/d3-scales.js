// d3-axis.js
import {ref, watchEffect, toValue, computed, onMounted} from 'vue'
import { scaleLinear, scaleBand } from "d3-scale";

export function useD3Scales(el, sample, width, height) {

    const yScale = computed(() => {
        return scaleLinear()
            .range([toValue(height) - 2 * 60, 0])
            .domain([0, 100]);
    })

    const xScale = computed(() => {
        return scaleBand()
            .range([0, toValue(width) - 2 * 60])
            .domain(toValue(sample).map((s) => s.language))
            .padding(0.4)
    })

    return { xScale, yScale }
}
