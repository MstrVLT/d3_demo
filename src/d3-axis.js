// d3-axis.js
import {ref, watchEffect, toValue, computed, onMounted} from 'vue'
import { select } from "d3-selection";
import { axisLeft, axisBottom } from "d3-axis";

export function useD3Axis(el, sample, yScale, xScale, width, height) {

    const left_axis = computed(() => axisLeft(toValue(yScale)))
    const bottom_axis = computed(() => axisBottom(toValue(xScale)))

    onMounted(() => {
        const chart = select(toValue(el))

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
}
