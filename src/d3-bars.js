// d3-axis.js
import {
    createElementVNode,
    ref,
    watchEffect,
    toValue,
    computed,
    onMounted,
    createVNode,
    getCurrentInstance,
    render,
    defineCustomElement, h, onBeforeUnmount, nextTick,
} from 'vue'
import * as d3 from "d3";
import D3Rect from "./components/D3Rect.vue";


const renderComponent = ({el}) => {
    let node = h(D3Rect)

    const {appContext} = getCurrentInstance()
    node.appContext = appContext
    render(node, el, "svg")

    return () => {
        render(null, el)
        node = undefined
    }
}

export function useD3Bars(el, sample, yScale, xScale, width, height) {
    const refs = ref([])

    const callback = (mutationList, observer) => {
        for (const mutation of mutationList) {
            if (mutation.type === "childList") {
                mutation.removedNodes.forEach(n => {
                    if (n.tagName === 'g' && n.classList.contains('bar')) {

                        // nextTick().then(() => n.__unmount__())
                    }
                })
            }
        }
    };

    const observer = ref(new MutationObserver(callback));
    onBeforeUnmount(() => {
        observer.value.disconnect();
    })

    onMounted(() => {

        observer.value.observe(toValue(el), {
            childList: true,
            subtree: true,
        });
        watchEffect(() => {
            const h = toValue(height) - 2 * 60
            const x = toValue(xScale)
            const y = toValue(yScale)

            d3.select(toValue(el))
                .selectAll('.bar')
                .data(toValue(sample), (d, idx) => d?.language)
                .join(
                    enter => enter
                        .append(d => {
                            // little experiment "adding vue component with d3"
                            const n = document.createElementNS("http://www.w3.org/2000/svg", 'g')
                            n.__unmount__ = renderComponent({el: n})
                            return n
                        })
                        .attr('class', 'bar'),
                    update => update
                        .select('rect')
                        .attr('fill', 'black')
                        .attr('x', (s) => x(s.language))
                        .attr('y', (s) => y(s.value))
                        .attr('height', (s) => Math.max(h - y(s.value), 0))
                        .attr('width', x.bandwidth())
                        .exit(),
                    exit => exit.call(selection => {
                        const remove = (d, i, nodes) => {
                            nodes[i]?.__unmount__?.()
                            let parent = nodes[i].parentNode;
                            if (parent) parent.removeChild(nodes[i]);
                        }
                        selection.each(remove)
                    })
                )
        })
    })
    return {
        refs
    }
}
