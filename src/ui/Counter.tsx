import { NumberUtil } from "@/utils/NumberUtil";
import { useEventCallback } from "@mui/material";
import { Button, View, Image, Text } from "@tarojs/components";
import { useDidHide, useDidShow, usePageScroll, usePullDownRefresh, useReachBottom, useReady, useRouter } from "@tarojs/taro";
import { count } from "console";
import React, { useEffect, useReducer, useState } from "react";

//组件UI
class Counter extends React.Component {
    state = { count: 0 };

    componentDidMount(): void {
        //初始化逻辑
    }

    render(): React.ReactNode {
        return (
            <>
                <Button onClick={() => {
                    this.setState({ count: this.state.count + 1 })
                }}
                >
                    {this.state.count}
                </Button>

                <Button onClick={() => this.setState({ count: this.state.count + 1 })}>
                    {this.state.count}
                </Button>

            </>
        )
    }

}


//函数UI
function CounterV2() {
    const [countV2, setCount] = useState(0);

    const { params } = useRouter(); // 假设路径为 /detail?id=123
    console.log(params.id); // 123

    NumberUtil.format(123456789);
    usePullDownRefresh(() => {

    })

    useReachBottom(() => {

    })

    usePageScroll(({ scrollTop }) => {
    });


    useEventCallback(() => {
        
    })

    useReady(() => {

    })
    useDidShow(() => {

    })

    useDidHide(() => {

    })

    useEffect(() => {
        // 相当于 componentDidMount + componentDidUpdate
        return () => { /* 相当于 componentWillUnmount */ };
    }, []);

    return (
        <Button onClick={() => setCount(countV2 + 1)}>
            {countV2}
        </Button>
    );


    // 纯展示组件
    function ProductCard({ name, price, imageUrl }) {
        return (
            <View className='product-card'>
                <Image src={imageUrl} />
                <Text>{name}</Text>
                <Text className='price'>{price}</Text>
            </View>
        );
    }


    // 定义 reducer 函数
    const initialState = { count: 0 };
    function reducer(state, action) {
        switch (action.type) {
            case 'increment':
                return { count: state.count + 1 };
            case 'decrement':
                return { count: state.count - 1 };
            default:
                throw new Error();
        }
    }

    function CounterV3() {
        const [state, dispatch] = useReducer(reducer, initialState);

        return (
            <>
                Count: {state.count}
                <button onClick={() => dispatch({ type: 'increment' })}>+</button>
                <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
            </>
        );
    }

}