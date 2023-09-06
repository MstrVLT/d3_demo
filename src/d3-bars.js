// d3-axis.js
import {ref, watchEffect, toValue, computed, onMounted} from 'vue'
import * as d3 from "d3";

export function useD3Bars(el, sample, yScale, xScale, width, height) {

    onMounted(() => {
        watchEffect(() => {
            const h = toValue(height) - 2 * 60
            const x = toValue(xScale)
            const y = toValue(yScale)

            d3.select(toValue(el))
                .selectAll('.bar')
                .data(toValue(sample))
                .join("rect")
                .attr('class', 'bar')
                .attr('x', (s) => x(s.language))
                .attr('y', (s) => y(s.value))
                .attr('height', (s) => Math.max(h - y(s.value), 0))
                .attr('width', x.bandwidth())
        })
    })

    return { }
}
