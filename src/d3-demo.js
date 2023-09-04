// d3-demo.js
import {ref, watchEffect, toValue, computed, onMounted} from 'vue'
import * as d3 from "d3";

export function useD3(el, width) {

    const scale = computed(() => {
        return d3.scaleLinear()
            .domain([0, 100])
            .range([0, toValue(width)])
    })

    const bottom_axis = computed(() =>
        d3.axisBottom(toValue(scale))
            .ticks(toValue(width) / 80)
            .tickSizeOuter(0)
    )

    onMounted(() => {
        const axis =
                d3.select(toValue(el))
                    .append("g")

        watchEffect(() => {
            axis.call(toValue(bottom_axis));
        })
    })

    return { scale, bottom_axis }
}
