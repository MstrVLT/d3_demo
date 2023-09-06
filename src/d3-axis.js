// d3-axis.js
import {ref, watchEffect, toValue, computed, onMounted} from 'vue'
import * as d3 from "d3";

export function useD3Axis(el, sample, yScale, xScale, width, height) {

    const left_axis = computed(() => d3.axisLeft(toValue(yScale)))
    const bottom_axis = computed(() => d3.axisBottom(toValue(xScale)))

    onMounted(() => {
        const chart = d3.select(toValue(el))

        const xAxis = chart.append('g')
        const yAxis = chart.append('g')

        watchEffect(() => {
            xAxis
                .attr('transform', `translate(0, ${toValue(height) - 2 * 60})`)
                .call(toValue(bottom_axis))
            yAxis
                .call(toValue(left_axis))
        })
    })

    return { xScale, yScale }
}
