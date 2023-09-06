// d3-axis.js
import {ref, watchEffect, toValue, computed, onMounted} from 'vue'
import * as d3 from "d3";

export function useD3Scales(el, sample, width, height) {

    const yScale = computed(() => {
        return d3.scaleLinear()
            .range([toValue(height) - 2 * 60, 0])
            .domain([0, 100]);
    })

    const xScale = computed(() => {
        return d3.scaleBand()
            .range([0, toValue(width) - 2 * 60])
            .domain(toValue(sample).map((s) => s.language))
            .padding(0.4)
    })

    return { xScale, yScale }
}
