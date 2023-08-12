// 本地数据存储变量
let _data = {
    id: 1,
    label: '总经理',
    value: '总经理1',
    width: '140px',
    height: 170,
    backgroundColor: '#6366E9',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNc2yGvtmfuaU4mLABRBinZy7ahN8o_8s0xw&usqp=CAU',
    description: 'CEO',
    children: [
        {
            id: 10,
            label: '部门A',
            value: '部门A10',
            width: 120,
            height: 170,
            backgroundColor: '#9D5AEE',
            img: 'data:image/jpeg;base64,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',
            children: [
                {
                    id: 100,
                    label: '成员1',
                    value: '成员100',
                    height: 70,
                    backgroundColor: '#6366E9',
                    children: [
                        {
                            id: 140,
                            label: '成员1',
                            value: '成员140',
                            height: 80,
                            backgroundColor: '#99CCCC',
                            children: [
                                {
                                    id: 140,
                                    label: '成员6',
                                    value: '成员163',
                                    backgroundColor: '#FFCC99',
                                    height: 55,
                                    width: 119
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
                    id: 101,
                    label: '成员2',
                    value: '成员101',
                    height: '60px',
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
                    height: '65px'
                },
                {
                    id: 111,
                    label: '成员2',
                    value: '成员111',
                    height: '80px',
                    children: [
                        {
                            id: 140,
                            label: '成员6',
                            value: '成员163',
                            backgroundColor: '#FFCCCC',
                            height: 55,
                            width: 130
                        },
                        {
                            id: 141,
                            label: '成员6',
                            value: '成员164',
                            width: 120,
                            height: '65'
                        }
                    ]
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
            width: 120,
            height: 170,
            backgroundColor: '#55B5A6',
            children: [
                {
                    id: 120,
                    label: '成员1',
                    value: '成员120',
                    height: 50,
                    children: [
                        {
                            id: 140,
                            label: '成员1',
                            value: '成员140',
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
                                },
                                {
                                    id: 140,
                                    label: '成员1',
                                    value: '成员140',
                                }
                            ]
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
                                },
                                {
                                    id: 140,
                                    label: '成员1',
                                    value: '成员140',
                                    height: '100'
                                },
                                {
                                    id: 140,
                                    label: '成员1',
                                    value: '成员140',
                                }
                            ]
                        },
                        {
                            id: 140,
                            label: '成员1',
                            value: '成员140',
                        }
                    ]
                },
                {
                    id: 121,
                    label: '成员2',
                    value: '成员121',
                    height: 80
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

export {
    _data
}