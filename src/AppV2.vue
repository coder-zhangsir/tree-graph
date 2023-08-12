<template>
    <div :class="['container', { 'justify-content-center flex': dragable }]">
        <!-- root -->
        <div class="dragAndZoom">
            <div v-if="data && data.id != undefined" class="root" :style="[nodeStyle[0]]">

                <div v-if="enableMask" class="root large mask" :style="[nodeStyle[0]]"
                    @click="nodeActiveState[0] = !nodeActiveState[0]" @mouseenter="(e) => {
                        buttonRef = e.currentTarget;
                        visible = true;
                        updateTooltip(data.value);
                        showTooltipTimeout();
                    }" @mouseleave="hideTooltipTimeout">
                    <img v-if="data.img" :src="data.img" alt="">
                    <h3 v-if="data.label">{{ data.label }}</h3>
                    <p v-if="data.description">{{ data.description }}</p>
                </div>

                <!-- title-vertical-line -->
                <div v-if="data.children && data.children.length != 0 && nodeActiveState[0]"
                    :style="[lineWidthConfig.title_vertical_line]" class="title-vertical-line">
                    <!-- title-horizontal-line -->
                    <div :class="['title-bottom-horizontal-line']" :style="[lineWidthConfig.title_horizontal_line]">
                        <!-- level2-vertical-line -->
                        <div v-for="(node, index) in level2Datas" class="level2-vertical-line"
                            :style="[lineWidthConfig.level2_vertical_line[index]]">
                            <!-- level2 element -->
                            <div v-if="data.children[index] && data.children[index].id != undefined" class="level2"
                                :style="[nodeStyle[1][index]]">
                                <div v-if="enableMask" class="level2 medium mask"
                                    :style="[nodeStyle[1][index], { left: 0 }]"
                                    @click="nodeActiveState[1][index] = !nodeActiveState[1][index]" @mouseenter="(e) => {
                                        buttonRef = e.currentTarget;
                                        visible = true;
                                        updateTooltip(data.children[index].value);
                                        showTooltipTimeout();
                                    }" @mouseleave="hideTooltipTimeout">
                                    <img v-if="data.children[index].img" :src="data.children[index].img" alt="">
                                    <h3 v-if="data.children[index].label">{{ data.children[index].label }}</h3>
                                    <p v-if="data.children[index].description">{{ data.children[index].description }}</p>
                                </div>

                                <!-- 5 * 40 - 20 + 20 * 4 + 30 -->
                                <!-- level3-vertical-line -->
                                <div v-if="data.children[index].children && nodeActiveState[1][index]"
                                    class="level3-vertical-line" :style="[lineWidthConfig.level3_vertical_line[index]]">
                                    <!-- level3-horizontal-line -->
                                    <div v-for="(nodeTwo, indexTwo) in data.children[index].children"
                                        class="level3-horizontal-line"
                                        :style="[lineWidthConfig.level3_horizontal_line[index][indexTwo]]">
                                        <!-- level3 element -->
                                        <div class="level3" :style="[nodeStyle[2][index][indexTwo]]">
                                            <div v-if="enableMask" class="small mask level3"
                                                :style="[nodeStyle[2][index][indexTwo]]" @click="() => {
                                                    nodeActiveState[2][index][indexTwo] = !nodeActiveState[2][index][indexTwo]
                                                    calculatedLineWidth()
                                                }" @mouseenter="(e) => {
    buttonRef = e.currentTarget;
    visible = true;
    updateTooltip(data.children[index].children[indexTwo].value);
    showTooltipTimeout();
}" @mouseleave="hideTooltipTimeout">
                                                <img v-if="data.children[index].children[indexTwo].img"
                                                    :src="data.children[index].children[indexTwo].img" alt="">
                                                <h3 v-if="data.children[index].children[indexTwo].label">{{
                                                    data.children[index].children[indexTwo].label }}</h3>
                                                <p v-if="data.children[index].children[indexTwo].description">{{
                                                    data.children[index].children[indexTwo].description }}</p>
                                            </div>


                                            <!-- level4 area -->
                                            <!-- level4-vertical-line -->
                                            <div v-if="data.children[index].children[indexTwo].children && nodeActiveState[2][index][indexTwo]"
                                                class="level4-vertical-line"
                                                :style="[lineWidthConfig.level4_vertical_line[index][indexTwo]]">
                                                <!-- level4-horizontal-line -->
                                                <div v-for="(nodeThree, indexThree) in data.children[index].children[indexTwo].children"
                                                    class="level4-horizontal-line"
                                                    :style="[lineWidthConfig.level4_horizontal_line[index][indexTwo][indexThree]]">
                                                    <!-- level4 element -->
                                                    <div class="level4" style="border: 0"
                                                        :style="[nodeStyle[3][index][indexTwo][indexThree]]">
                                                        <div v-if="enableMask" class="small mask level4"
                                                            :style="[nodeStyle[3][index][indexTwo][indexThree], { top: 0 }]"
                                                            @click="() => {
                                                                nodeActiveState[3][index][indexTwo][indexThree] = !nodeActiveState[3][index][indexTwo][indexThree]
                                                                calculatedLineWidth()
                                                            }" @mouseenter="(e) => {
    buttonRef = e.currentTarget;
    visible = true;
    updateTooltip(data.children[index].children[indexTwo].children[indexThree].value);
    showTooltipTimeout();
}" @mouseleave="hideTooltipTimeout">
                                                            <img v-if="data.children[index].children[indexTwo].children[indexThree].img"
                                                                :src="data.children[index].children[indexTwo].children[indexThree].img"
                                                                alt="">
                                                            <h3
                                                                v-if="data.children[index].children[indexTwo].children[indexThree].label">
                                                                {{
                                                                    data.children[index].children[indexTwo].children[indexThree].label
                                                                }}</h3>
                                                            <p
                                                                v-if="data.children[index].children[indexTwo].children[indexThree].description">
                                                                {{
                                                                    data.children[index].children[indexTwo].children[indexThree].description
                                                                }}</p>
                                                        </div>

                                                        <!-- level5 area -->
                                                        <!-- level5-vertical-line -->
                                                        <div v-if="data.children[index].children[indexTwo].children[indexThree].children && nodeActiveState[3][index][indexTwo][indexThree]"
                                                            class="level5-vertical-line"
                                                            :style="[lineWidthConfig.level5_vertical_line[index][indexTwo][indexThree]]">
                                                            <!-- level5-horizontal-line -->
                                                            <div v-for="(nodeFour, indexFour) in data.children[index].children[indexTwo].children[indexThree].children"
                                                                class="level5-horizontal-line"
                                                                :style="[lineWidthConfig.level5_horizontal_line[index][indexTwo][indexThree][indexFour]]">
                                                                <!-- level5 element -->
                                                                <div class="level5" style="border: 0">
                                                                    <div v-if="enableMask" class="small mask level5"
                                                                        :style="[nodeStyle[4][index][indexTwo][indexThree][indexFour], { top: 0 }]"
                                                                        @mouseenter="(e) => {
                                                                            buttonRef = e.currentTarget;
                                                                            visible = true;
                                                                            updateTooltip(data.children[index].children[indexTwo].children[indexThree].children[indexFour].value);
                                                                            showTooltipTimeout();
                                                                        }" @mouseleave="hideTooltipTimeout">
                                                                        <img v-if="data.children[index].children[indexTwo].children[indexThree].children[indexFour].img"
                                                                            :src="data.children[index].children[indexTwo].children[indexThree].children[indexFour].img"
                                                                            alt="">
                                                                        <h3
                                                                            v-if="data.children[index].children[indexTwo].children[indexThree].children[indexFour].label">
                                                                            {{
                                                                                data.children[index].children[indexTwo].children[indexThree].children[indexFour].label
                                                                            }}
                                                                        </h3>
                                                                        <p
                                                                            v-if="data.children[index].children[indexTwo].children[indexThree].children[indexFour].description">
                                                                            {{
                                                                                data.children[index].children[indexTwo].children[indexThree].children[indexFour].description
                                                                            }}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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

    <!-- Test ChangeData -->
    <!-- <el-button round size="large" type="primary" @click.once="() => { changeData() }">ChangeData</el-button> -->
</template>
<script setup>
import { onMounted, reactive, ref } from 'vue';
import { _data } from './assets/help/localData'
import './assets/less/tree.less?'
import axios from 'axios'
/* in ES 6 */
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import Panzoom from '@panzoom/panzoom';



const data = ref(_data)
const dragable = ref(true)

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


/**
 * 树型图要根据这个配置来渲染线条数据
 * option: 
 *  width: 线条宽度,
 *  height: 线条高度,
 *  top: 当前元素上边与父元素上边的距离
 * 
 * warn: 不需要手动修改
 * @const
 * @type {Object} 配置信息
 */
const lineWidthConfig = ref({
    title_vertical_line: {},
    title_horizontal_line: {},
    level2_vertical_line: {},
    // level2_horizontal_line: {},
    level3_vertical_line: [],
    level3_horizontal_line: [],
    level4_vertical_line: [],
    level4_horizontal_line: [],
    level5_vertical_line: [],
    level5_horizontal_line: [],
})


/**
 * 每个节点的活跃状态，用于展开折叠功能
 *
 * @type {array}
 */
const nodeActiveState = ref([])


/**
 * 节点的样式，包含宽高，背景颜色，内容分布，光标样式
 *
 * @type {array}
 */
const nodeStyle = ref([])



/**
 * 通过 data 自动生成每一级节点活跃状态
 *
 * @const
 */
const generateNodeState = () => {
    const level1 = data.value

    let obj = []

    /* 设计结构 */
    // [0]: true|false  -> level1
    // [1][~]: true|false -> level2
    // [2][~][~]: true|false -> level3
    // [3][~][~][~]: true|false -> level4
    // [4][~][~][~][~]: true|false -> level5
    obj[0] = true

    // level2
    const level2 = level1.children
    level2?.forEach((ele, index2) => {
        // 节点下二层数组不存在时
        obj[1] === undefined && (() => obj[1] = [])()

        obj[1][index2] = true


        // level3
        const level3 = ele.children
        level3?.forEach((ele, index3) => {
            // 节点下三层数组不存在时
            obj[2] === undefined && (() => obj[2] = [])()
            obj[2][index2] === undefined && (() => obj[2][index2] = [])()

            obj[2][index2][index3] = true


            // level4
            const level4 = ele.children
            level4?.forEach((ele, index4) => {
                // 节点下四层数组不存在时
                obj[3] === undefined && (() => obj[3] = [])()
                obj[3][index2] === undefined && (() => obj[3][index2] = [])()
                obj[3][index2][index3] === undefined && (() => obj[3][index2][index3] = [])()

                obj[3][index2][index3][index4] = true


                // level5
                const level5 = ele.children
                level5?.forEach((ele, index5) => {
                    // 节点下五层数组不存在时
                    obj[4] === undefined && (() => obj[4] = [])()
                    obj[4][index2] === undefined && (() => obj[4][index2] = [])()
                    obj[4][index2][index3] === undefined && (() => obj[4][index2][index3] = [])()
                    obj[4][index2][index3][index4] === undefined && (() => obj[4][index2][index3][index4] = [])()

                    obj[4][index2][index3][index4][index5] = true
                })
            })
        })
    })

    // console.log(obj)
    nodeActiveState.value = obj
}
generateNodeState()

/**
 * 通过 data 自动计算出合适的线条配置, 并且调整节点宽高
 *
 * @const
 * @param {string|int} val 要转换的数据
 * @return {int} 返回转换后整数值
 */
const convertWHToInt = (val) => {
    return (Number.isInteger(val) && val) || parseInt(val)
}


/**
 * 通过 data 自动计算出合适的线条配置, 并且调整节点宽高
 *
 * @const
 */
const calculatedLineWidth = () => {
    const d = data.value
    const lwc = lineWidthConfig.value
    const state = nodeActiveState.value
    const node = nodeStyle.value

    // console.log(state)

    // 检测level2节点数量是否不为空
    const level2NodeExists = d.children && d.children.length != 0
    // level2所有数据
    const level2D = d.children

    // 收集data中对level1根节点的样式并应用
    node[0] === undefined && (() => node[0] = {})()
    node[0].width = (convertWHToInt(d.width) || 240) + 'px'
    node[0].height = (convertWHToInt(d.height) || 40) + 'px'
    node[0].backgroundColor = d.backgroundColor || ''




    // 计算标题下面垂直线和水平线的宽高
    if (level2NodeExists) {
        lwc.title_vertical_line = { width: '3px', height: '30px' }

        // 计算
        const widthByEveryChildren = () => {
            let addition = 0
            // level2
            d.children.forEach((ele, index) => {
                addition += convertWHToInt(ele.width) || 200

                // 收集data中对level2节点的样式并应用
                node[1] === undefined && (() => node[1] = [])()
                node[1][index] === undefined && (() => node[1][index] = {})()
                node[1][index].width = (convertWHToInt(ele.width) || 200) + 'px'
                node[1][index].height = (convertWHToInt(ele.height) || 40) + 'px'
                node[1][index].backgroundColor = ele.backgroundColor || ''
                node[1][index].left = (() => {
                    if (ele.width)
                        return `-${Math.round(convertWHToInt(ele.width) / 2)}px`
                })() || '-100px'
            })
            // console.log(addition)
            return Math.round(addition /= 3)
        }

        lwc.title_horizontal_line = {
            width: (d.children.length - 1) * widthByEveryChildren() + (d.children.length - 1) * 20 + 'px',
            height: 3 + 'px'
        }
    }

    // 计算level2上方垂直线
    if (level2NodeExists) {
        let level5NodeW = []
        level2D.forEach((e, index2) => {
            // level3所有数据
            const level3D = level2D[index2].children

            lwc.level2_vertical_line[index2] = {
                left: (1.0 / (level2D.length - 1)) * 100 * index2 + '%',
                width: 3 + 'px',
                height: 30 + 'px'
            }



            // level3 垂直线长度
            lwc.level3_vertical_line[index2] = {
                width: 3 + 'px',
                height: (() => {
                    // e.children.length * 40 - 20 + 20 * (e.children.length - 1)
                    let h = 20 * (e.children.length - 1)
                    level3D.forEach((ele, index3) => {
                        h += convertWHToInt(ele.height || 40)
                    })
                    h -= 20

                    // 上面计算没问题

                    // 扩展level4高度
                    const checkLevel4NodeExists = () => {
                        let level4H = 0
                        // 检测是否有level4的节点
                        level3D.forEach((ele, index3) => {
                            // console.log(ele)
                            // 收集data中对level3节点的样式并应用
                            node[2] === undefined && (() => node[2] = [])()
                            node[2][index2] === undefined && (() => node[2][index2] = [])()
                            node[2][index2][index3] === undefined && (() => node[2][index2][index3] = {})()
                            node[2][index2][index3].width = (convertWHToInt(ele.width) || 105) + 'px'
                            node[2][index2][index3].height = (convertWHToInt(ele.height) || 40) + 'px'
                            node[2][index2][index3].backgroundColor = ele.backgroundColor || ''


                            // 遍历level4节点
                            // 检测是否有level4节点，并返回对应值，这里20是多出与后面节点相隔的
                            let temp = (() => {
                                if (ele.children) return 20
                                else return 0
                            })()
                            ele.children?.forEach((ele4, index4) => {
                                // if (index2 === 1) console.log(convertWHToInt(ele4.height || 40))
                                temp += convertWHToInt(ele4.height || 40)
                                // if (index2 === 1) console.log(temp)
                                if (index4 != ele.children.length - 1) {
                                    temp += 20
                                }
                                // 如果当前level4节点被隐藏，将不再显示
                                if (state[2][index2][index3] === false) temp = 0

                                // 如果是level3中最后一个节点检测出有level4级别节点，那么这个时候将不再添加到这里面去
                                if (index3 === level3D.length - 1) temp = 0

                                // 收集data中对level4节点的样式并应用
                                node[3] === undefined && (() => node[3] = [])()
                                node[3][index2] === undefined && (() => node[3][index2] = [])()
                                node[3][index2][index3] === undefined && (() => node[3][index2][index3] = [])()
                                node[3][index2][index3][index4] === undefined && (() => node[3][index2][index3][index4] = {})()
                                node[3][index2][index3][index4].width = (convertWHToInt(ele4.width) || 105) + 'px'
                                node[3][index2][index3][index4].height = (convertWHToInt(ele4.height) || 40) + 'px'
                                node[3][index2][index3][index4].backgroundColor = ele4.backgroundColor || ''


                                let temp2 = (() => {
                                    if (ele4.children) return 20
                                    else return 0
                                })()

                                ele4.children?.forEach((ele5, index5) => {
                                    // if (index2 === 0) console.log(convertWHToInt(ele5.height || 40))
                                    temp2 += convertWHToInt(ele5.height || 40)
                                    if (index5 != ele4.children.length - 1) {
                                        temp2 += 20
                                    }
                                    // 如果当前level4节点被隐藏，将不再显示
                                    // 当用户直接隐藏level4节点而不在乎level5，那么此时其level4内部的节点不会占用高度
                                    if (state[3][index2][index3][index4] === false || (state[2][index2][index3] === false && state[3][index2][index3][index4])) temp2 = 0

                                    // 如果是level4中最后一个节点检测出有level5级别节点，那么这个时候将不再添加到这里面去
                                    if (index4 === level3D.length - 1) temp2 = 0



                                    // 收集data中对level5节点的样式并应用
                                    node[4] === undefined && (() => node[4] = [])()
                                    node[4][index2] === undefined && (() => node[4][index2] = [])()
                                    node[4][index2][index3] === undefined && (() => node[4][index2][index3] = [])()
                                    node[4][index2][index3][index4] === undefined && (() => node[4][index2][index3][index4] = [])()
                                    node[4][index2][index3][index4][index5] === undefined && (() => node[4][index2][index3][index4][index5] = {})()
                                    node[4][index2][index3][index4][index5].width = (convertWHToInt(ele5.width) || 105) + 'px'
                                    node[4][index2][index3][index4][index5].height = (convertWHToInt(ele5.height) || 40) + 'px'
                                    node[4][index2][index3][index4][index5].backgroundColor = ele5.backgroundColor || ''
                                })
                                level4H += temp2
                            })
                            level4H += temp
                        })
                        return level4H
                    }
                    h += checkLevel4NodeExists()

                    h += 'px'
                    return h
                })()
            }

            // level3 水平线长度
            let ele3AllH = 0
            let tempForEle3H = 0
            lwc.level3_horizontal_line[index2] === undefined && (() => lwc.level3_horizontal_line[index2] = [])()
            level3D.forEach((ele3, index3) => {
                lwc.level3_horizontal_line[index2][index3] = {
                    height: 3 + 'px',
                    top: (() => {
                        // if (index3 != level3D.length - 1) ele3AllH += 20
                        ele3AllH += 20
                        if (index3 !== 0) {
                            if (tempForEle3H !== 0) {
                                ele3AllH += tempForEle3H
                                tempForEle3H = 0
                            }
                            else ele3AllH += convertWHToInt(ele3.height || 40)

                        }
                        if (convertWHToInt(ele3.height || 40) !== 40) tempForEle3H += convertWHToInt(ele3.height || 40)


                        let ele4AllH = 0
                        ele3.children?.forEach((ele4, index4) => {
                            if (state[2][index2][index3] === false) return
                            ele4AllH += 20
                            ele4AllH += convertWHToInt(ele4.height || 40)

                            let ele5AllH = 0
                            ele4.children?.forEach((ele5, index5) => {
                                if (state[3][index2][index3][index4] === false) return
                                ele5AllH += 20
                                ele5AllH += convertWHToInt(ele5.height || 40)
                            })
                            ele4AllH += ele5AllH
                        })


                        return ele3AllH + (() => {
                            // calculated ele4AllH
                            ele3AllH += ele4AllH
                            // if (index3 === 0) return 0
                            // else return ele4AllH
                            return 0
                        })() + 'px'
                    })()
                }
            })




            // level4 垂直线条
            level3D.forEach((ele3, index3) => {
                lwc.level4_vertical_line[index2] === undefined && (() => lwc.level4_vertical_line[index2] = [])()
                if (ele3.children && ele3.children.length != 0) {
                    const level4D = ele3.children
                    lwc.level4_vertical_line[index2][index3] = {
                        width: 3 + 'px',
                        height: (() => {
                            let h = 0
                            let ele4AllH = 0
                            let temp = 0
                            let temp2 = []
                            let allowAddTemp2D = true
                            level4D.forEach((ele4, index4) => {
                                ele4AllH += 20

                                if (index4 !== 0) {
                                    ele4AllH += temp
                                }
                                temp = convertWHToInt(ele4.height || 40)


                                // 考虑level5节点高度
                                let ele5AllH = 0
                                ele4.children?.forEach((ele5, index5) => {
                                    if (state[3][index2][index3][index4] === false) return
                                    ele5AllH += 20
                                    ele5AllH += convertWHToInt(ele5.height || 40)
                                })
                                temp2[index4] = (temp2[index4 - 1] || 0) + ele5AllH

                                if (level4D.length === 1) allowAddTemp2D = false
                            })
                            h += ele4AllH
                            // -2是因为数组最后一个不能算在内
                            if (allowAddTemp2D) h += temp2[temp2.length - 2]

                            h += 'px'
                            return h
                        })()
                    }
                }
            })

            // level4 水平线条
            level3D.forEach((e, index3) => {
                const level4D = e.children
                let ele4AllH = 0
                let temp = 0
                let temp2 = []
                level4D?.forEach((ele4, index4) => {
                    lwc.level4_horizontal_line[index2] === undefined && (() => lwc.level4_horizontal_line[index2] = [])()
                    lwc.level4_horizontal_line[index2][index3] === undefined && (() => lwc.level4_horizontal_line[index2][index3] = [])()
                    lwc.level4_horizontal_line[index2][index3][index4] = {
                        top: (() => {
                            ele4AllH += 20
                            if (index4 !== 0) {
                                ele4AllH += temp
                            }

                            // ele4AllH += temp2

                            temp = convertWHToInt(ele4.height || 40)

                            let ele5AllH = 0
                            ele4.children?.forEach((ele5, index5) => {
                                if (state[3][index2][index3][index4] === false) return
                                ele5AllH += 20
                                ele5AllH += convertWHToInt(ele5.height || 40)
                            })
                            temp2[index4] = (temp2[index4 - 1] || 0) + ele5AllH


                            return ele4AllH + (() => {
                                return temp2[index4 - 1] || 0
                            })() + 'px'
                        })(),
                        height: 3 + 'px'
                    }
                })
            })


            // level5 垂直线条
            level3D.forEach((ele3, index3) => {
                ele3.children?.forEach((ele4, index4) => {
                    ele4.children?.forEach((ele5, index5) => {
                        // if (index2 === 0) console.log(ele5)
                        lwc.level5_vertical_line[index2] === undefined && (() => lwc.level5_vertical_line[index2] = [])()
                        lwc.level5_vertical_line[index2][index3] === undefined && (() => lwc.level5_vertical_line[index2][index3] = [])()
                        lwc.level5_vertical_line[index2][index3][index4] = {
                            width: '3px',
                            height: (() => {
                                let ele5AllH = -40
                                ele4.children?.forEach((ele5, index5) => {
                                    ele5AllH += 20
                                    ele5AllH += convertWHToInt(ele5.height || 40)
                                })
                                return ele5AllH + 'px'
                            })()
                        }
                    })
                })
            })

            // level5 水平线条
            level3D.forEach((ele3, index3) => {
                ele3.children?.forEach((ele4, index4) => {
                    let ele5AllH = 0
                    let temp = 0
                    ele4.children?.forEach((ele5, index5) => {
                        lwc.level5_horizontal_line[index2] === undefined && (() => lwc.level5_horizontal_line[index2] = [])()
                        lwc.level5_horizontal_line[index2][index3] === undefined && (() => lwc.level5_horizontal_line[index2][index3] = [])()
                        lwc.level5_horizontal_line[index2][index3][index4] === undefined && (() => lwc.level5_horizontal_line[index2][index3][index4] = [])()
                        lwc.level5_horizontal_line[index2][index3][index4][index5] = {
                            height: '3px',
                            top: (() => {
                                ele5AllH += 20
                                ele5AllH += temp

                                temp = convertWHToInt(ele5.height || 40)

                                return ele5AllH + 'px'
                            })()
                        }

                        level5NodeW.push(ele5.width || 105)
                    })
                })
            })


            // 二级目录水平线长度自动分布
            // 根据level5节点的最大(max)宽度来控制
            /* 设计架构 */
            // width: <120 set: 120
            // width: 120 <= ~ < 220 set: 200
            // width: >=220 set: 300
            let max = Math.max(...level5NodeW)
            let value = 120
            if (max < 120) value = 120
            else if (max >= 120 && max < 220) value = 200
            else if (max >= 220) value = 300

            lwc.title_horizontal_line.width = parseInt(lwc.title_horizontal_line.width) + value + 'px'
        })
    }
}
calculatedLineWidth()


/**
 * 通过 nodeActiveState 自动计算出哪些节点cursor设置为pointer
 *
 * @const
 */
const calculatedNodeCursor = () => {
    const state = nodeActiveState.value
    const node = nodeStyle.value

    /* 设计架构 */
    // [0]: {}  -> level1
    // [1][~]: {}  -> level2
    // [2][~][~]: {}  -> level3
    // [3][~][~][~]: {}  -> level4

    // level1 -> level2
    if (state[0]) {
        if (state[1].length != 0) {
            node[0] === undefined && (() => node[0] = {})()
            node[0].cursor = 'pointer'
        }
        else node[0].cursor = 'not-allowed'
    }

    // level2 -> level3
    if (state[1]) {
        state[1].forEach((ele, index2) => {
            state[2] && state[2][index2] && (() => {
                if (state[2][index2].length != 0) {
                    node[1] === undefined && (() => node[1] = [])()
                    node[1][index2] === undefined && (() => node[1][index2] = {})()
                    node[1][index2].cursor = 'pointer'
                }
                else node[1][index2].cursor = 'not-allowed'

                // level3 -> level4
                state[2][index2].forEach((ele, index3) => {
                    node[2] === undefined && (() => node[2] = [])()
                    node[2][index2] === undefined && (() => node[2][index2] = [])()
                    node[2][index2][index3] === undefined && (() => node[2][index2][index3] = {})()
                    if (state[3] && state[3][index2] && state[3][index2][index3] && state[3][index2][index3].length !== 0) {
                        node[2][index2][index3].cursor = 'pointer'
                    }
                    else node[2][index2][index3].cursor = 'not-allowed'

                    // level4 -> level5
                    if (state[3] && state[3][index2] && state[3][index2][index3]) {
                        state[3][index2][index3].forEach((ele, index4) => {
                            node[3] === undefined && (() => node[3] = [])()
                            node[3][index2] === undefined && (() => node[3][index2] = [])()
                            node[3][index2][index3] === undefined && (() => node[3][index2][index3] = [])()
                            node[3][index2][index3][index4] === undefined && (() => node[3][index2][index3][index4] = {})()
                            if (state[4] && state[4][index2] && state[4][index2][index3] && state[4][index2][index3][index4] && state[4][index2][index3][index4].length != 0) {
                                node[3][index2][index3][index4].cursor = 'pointer'
                            }
                            else node[3][index2][index3][index4].cursor = 'not-allowed'


                            // level5
                            if (state[4] && state[4][index2] && state[4][index2][index3] && state[4][index2][index3][index4]) {
                                state[4][index2][index3][index4].forEach((ele, index5) => {
                                    node[4] === undefined && (() => node[4] = [])()
                                    node[4][index2] === undefined && (() => node[4][index2] = [])()
                                    node[4][index2][index3] === undefined && (() => node[4][index2][index3] = [])()
                                    node[4][index2][index3][index4] === undefined && (() => node[4][index2][index3][index4] = [])()
                                    node[4][index2][index3][index4][index5] === undefined && (() => node[4][index2][index3][index4][index5] = {})()

                                    node[4][index2][index3][index4][index5].cursor = 'not-allowed'
                                })
                            }
                        })
                    }

                })
            })()

        })
    }

}
calculatedNodeCursor()



// 修改数据重新渲染
const changeData = (val) => {
    if (val) data.value = val
    else data.value = {
        id: 1,
        label: '总经理',
        value: '总经理1',
        children: [
            {
                id: 10,
                label: '部门A',
                value: '部门A10',
                children: [
                    {
                        id: 100,
                        label: '成员1',
                        value: '成员100',
                        children: [
                            {
                                id: 140,
                                label: '成员1',
                                value: '成员140',
                                children: [
                                    {
                                        id: 140,
                                        label: '成员6',
                                        value: '成员163',
                                    },
                                    {
                                        id: 141,
                                        label: '成员6',
                                        value: '成员164',
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id: 102,
                        label: '成员3',
                        value: '成员102',
                        children: [
                            {
                                id: 140,
                                label: '成员1',
                                value: '成员140',
                            },
                            {
                                id: 141,
                                label: '成员2',
                                value: '成员141',
                            },
                            {
                                id: 142,
                                label: '成员3',
                                value: '成员142',
                            },
                            {
                                id: 143,
                                label: '成员4',
                                value: '成员143',
                            }
                        ]
                    },
                    {
                        id: 103,
                        label: '成员4',
                        value: '成员103',
                    },
                    {
                        id: 104,
                        label: '成员5',
                        value: '成员104',
                        children: [
                            {
                                id: 140,
                                label: '成员1',
                                value: '成员140',
                            }
                        ]
                    },
                ]
            },
            {
                id: 11,
                label: '部门B',
                value: '部门B11',
                children: [
                    {
                        id: 110,
                        label: '成员1',
                        value: '成员110',
                    },
                    {
                        id: 111,
                        label: '成员2',
                        value: '成员111',
                    },
                    {
                        id: 112,
                        label: '成员3',
                        value: '成员112',
                    },
                    {
                        id: 113,
                        label: '成员4',
                        value: '成员113',
                    },
                    {
                        id: 114,
                        label: '成员5',
                        value: '成员114',
                    },
                ]
            },
            {
                id: 12,
                label: '部门C',
                value: '部门C12',
                children: [
                    {
                        id: 120,
                        label: '成员1',
                        value: '成员120',
                        children: [
                            {
                                id: 140,
                                label: '成员1',
                                value: '成员140',
                            },
                            {
                                id: 140,
                                label: '成员1',
                                value: '成员140',
                                children: [
                                    {
                                        id: 140,
                                        label: '成员1',
                                        value: '成员140',
                                        children: [
                                            {
                                                id: 140,
                                                label: '成员6',
                                                value: '成员163',
                                            },
                                            {
                                                id: 141,
                                                label: '成员6',
                                                value: '成员164',
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id: 121,
                        label: '成员2',
                        value: '成员121',
                    },
                    {
                        id: 122,
                        label: '成员3',
                        value: '成员122',
                    },
                    {
                        id: 123,
                        label: '成员4',
                        value: '成员123',
                    }
                ]
            }
        ]
    }

    // 位置不能变，先生成节点状态，主要是为后面计算线宽时宽高自适应
    generateNodeState()
    calculatedLineWidth()
    calculatedNodeCursor()
}

// 处理成功消息
const successMessage = (msg) => {
    ElMessage({
        message: msg,
        type: 'success',
    })
}
// 导出png图片
const exportPng = () => {
    // console.log('export png')
    var node = document.querySelector('.container');

    domtoimage.toBlob(node).then(function (blob) {
        saveAs(blob, 'file.png');
        successMessage('Export successfully.');
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

// 页面元素挂载后
onMounted(() => {
    /* 配置拖拽和缩放画布功能 */
    const elem = document.querySelector('.dragAndZoom')
    const panzoom = Panzoom(elem, { canvas: true })
    const parent = elem.parentElement
    // No function bind needed
    parent.addEventListener('wheel', panzoom.zoomWithWheel)

    // This demo binds to shift + wheel
    parent.addEventListener('wheel', function (event) {
        if (!event.shiftKey) return
        panzoom.zoomWithWheel(event)
    })
})

</script>
<style>
/* tooltip animation */
.singleton-tooltip {
    transition: transform 0.3s cubic-bezier(.23, 1, .32, 1);
}
</style>