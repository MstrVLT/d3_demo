// d3-axis.js
import {ref, watchEffect, toValue, computed, onMounted} from 'vue'
import { select } from "d3-selection";

export function useD3Bars(el, sample, yScale, xScale, width, height) {

    onMounted(() => {
        watchEffect(() => {
            const h = toValue(height) - 2 * 60
            const x = toValue(xScale)
            const y = toValue(yScale)

            select(toValue(el))
                .selectAll('.bar')
                .data(toValue(sample), (d, idx) => d?.language)
                .join(
                    enter => enter
                        .append("rect")
                        .attr('class', 'bar'),
                    update => update
                        .attr('x', (s) => x(s.language))
                        .attr('y', (s) => y(s.value))
                        .attr('height', (s) => Math.max(h - y(s.value), 0))
                        .attr('width', x.bandwidth()),
                    exit => exit.remove()
                )
        })
    })
}
