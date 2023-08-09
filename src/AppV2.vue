<template>
    <!-- <div class="root fill-node large flex flex-center margin">root</div>
    <div class="fill-node round medium flex flex-center margin">parent</div>
    <div class="coreless-node round medium flex flex-center margin">child</div> -->
    <!-- <node v-if="data && data.id != undefined">{{ data.value != undefined && data.value }}</node> -->
    <div :class="['container', { 'justify-content-center flex': dragable }]">
        <!-- root -->
        <div v-if="data && data.id != undefined" class="root">
            {{ data.label != undefined && data.label }}
            <div v-if="enableMask" class="large mask" @mouseenter="(e) => {
                buttonRef = e.currentTarget;
                visible = true;
                updateTooltip(data.value);
                showTooltipTimeout();
            }" @mouseleave="hideTooltipTimeout" />
            <!-- title-vertical-line -->
            <div v-if="data.children && data.children.length != 0" class="title-vertical-line">
                <!-- title-horizontal-line -->
                <div :class="['title-bottom-horizontal-line']" :style="[{ 'width': titleBottomHorLineWidth + 'px' }]">
                    <!-- level2-vertical-line -->
                    <div v-for="(node, index) in level2Datas" class="level2-vertical-line"
                        :style="[{ 'left': (1.0 / (level2Len - 1)) * 100 * index + '%' }]">
                        <!-- level2 element -->
                        <div v-if="data.children[index] && data.children[index].id != undefined" class="level2">
                            {{ data.children[index].label != undefined && data.children[index].label }}
                            <div v-if="enableMask" class="medium mask" @mouseenter="(e) => {
                                buttonRef = e.currentTarget;
                                visible = true;
                                updateTooltip(data.children[index].value);
                                showTooltipTimeout();
                            }" @mouseleave="hideTooltipTimeout" />

                            <!-- 5 * 40 - 20 + 20 * 4 + 30 -->
                            <!-- level3-vertical-line -->
                            <div v-if="data.children[index].children" class="level3-vertical-line"
                                :style="[{ 'height': data.children[index].children.length * 40 - 20 + 20 * (data.children[index].children.length - 1) + 35 + 'px' }]">
                                <!-- level3-horizontal-line -->
                                <div v-for="(nodeTwo, indexTwo) in data.children[index].children"
                                    class="level3-horizontal-line"
                                    :style="[{ 'top': 35 + (indexTwo + 1) * 40 + indexTwo * 20 - 20 + 'px' }]">
                                    <!-- level3 element -->
                                    <div class="level3">
                                        {{ data.children[index].children[indexTwo].label != undefined &&
                                            data.children[index].children[indexTwo].label }}
                                        <div v-if="enableMask" class="small mask" @mouseenter="(e) => {
                                            buttonRef = e.currentTarget;
                                            visible = true;
                                            updateTooltip(data.children[index].children[indexTwo].value);
                                            showTooltipTimeout();
                                        }" @mouseleave="hideTooltipTimeout" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <el-button round class="export" size="large" type="primary">
        <svg @click="exportPng" class="icon" style="margin-left: 20px;" aria-hidden="true">
            <use xlink:href="#icon-PNG"></use>
        </svg>
        <svg class="icon" style="margin-left: 20px; cursor: default;" aria-hidden="true">
            <use xlink:href="#icon-daochu"></use>
        </svg>
    </el-button>
    <el-tooltip ref="tooltipRef" :visible="visible" placement="top" :popper-options="{
        modifiers: [
            {
                name: 'computeStyles',
                options: {
                    adaptive: false,
                    enabled: false,
                },
            },
        ],
    }" :virtual-ref="buttonRef" virtual-triggering popper-class="singleton-tooltip">
        <template #content>
            <span> {{ tooltipContent }} </span>
        </template>
    </el-tooltip>
</template>
<script setup>
import { ref } from 'vue';
import { _data } from './assets/help/localData'
import './assets/less/tree.less?'
import axios from 'axios'
/* in ES 6 */
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';

const data = ref(_data)
const dragable = ref(true)

const level2Len = ref(data.value.children.length)
const titleBottomHorLineWidth = ref((level2Len.value - 1) * 200 + (level2Len.value - 1) * 20)
const level2Datas = ref(data.value.children)

const enableMask = ref(true)

const buttonRef = ref()
const tooltipRef = ref()

const visible = ref(false)

const tooltipContent = ref('')

let visibleTimeout = undefined

const updateTooltip = (content) => {
    tooltipContent.value = content
}

const hideTooltipTimeout = () => {
    visibleTimeout === undefined && (() => { visibleTimeout = setTimeout(() => { visible.value = false; visibleTimeout = undefined }, 2000); })()
}

const showTooltipTimeout = () => {
    visibleTimeout !== undefined && clearTimeout(visibleTimeout)
    visibleTimeout = undefined
}


const changeData = (val) => {
    data.value = val
    level2Len.value = data.value.children.length
    titleBottomHorLineWidth.value = (level2Len.value - 1) * 200 + (level2Len.value - 1) * 20
    level2Datas.value = data.value.children
}

const successMessage = () => {
    ElMessage({
        message: 'Export successfully.',
        type: 'success',
    })
}
const exportPng = () => {
    console.log('export png')
    var node = document.querySelector('.container');

    domtoimage.toBlob(node).then(function (blob) {
        saveAs(blob, 'file.png');
        successMessage();
    });
}


// 网络请求
const requestNetworkData = () => {
    return axios.get('/api/tree/data').then((res) => {
        // data 如果是 Object 而非 Array, 那么在查找节点时应当在外面套一层数组结构
        res.status === '200' && console.log(res.data)
        if (res.status === '200') {
            !Array.isArray(res.data) && changeData(res.data)
        }
    })
}

</script>
<style>
.singleton-tooltip {
    transition: transform 0.3s cubic-bezier(.23, 1, .32, 1);
}
</style>