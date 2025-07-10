import { ScrollView, View } from "@tarojs/components";
import './index.scss'

export default function Index() {

    function SelectorId() {
        return (
            <>
                <div>
                    <h1 className='chp-head'>1、id选择器</h1>
                    <p id='pId'>
                        id 选择器可以为标有特定 id 的 HTML 元素指定特定的样式。
                        HTML元素以id属性来设置id选择器,CSS 中 id 选择器以 &quot;#&quot; 来定义。
                    </p>

                </div>
            </>
        )
    }

    function SelectorClass() {
        return (
            <>
                <div>
                    <h1 className='chp-head'>2、类选择器</h1>
                    <p id='pId'>
                        class 选择器用于描述一组元素的样式，class 选择器有别于id选择器，class可以在多个元素中使用。
                        class 选择器在 HTML 中以 class 属性表示, 在 CSS 中，类选择器以一个点 . 号显示。类名的第一个字符不能使用数字！它无法在 Mozilla 或 Firefox 中起作用。
                    </p>
                    <h1 className='center'>标题居中</h1>
                    <p className='center color'>段落居中，颜色为红色。</p>
                </div>
            </>
        )
    }

    function StyleSheet() {
        return (
            <>
                <div>
                    <h1 className='chp-head'>3、外部样式、内部样式、内联样式</h1>
                </div>
            </>
        )
    }
    function TableStyle() {
        return (
            <>
                <h1 className='chp-head'>4、这是一个表格</h1>
                <table id='customers'>
                    <tr>
                        <th>Company</th>
                        <th>Contact</th>
                        <th>Country</th>
                    </tr>
                    <tr>
                        <td>Alfreds Futterkiste</td>
                        <td>Maria Anders</td>
                        <td>Germany</td>
                    </tr>
                    <tr className='alt'>
                        <td>Berglunds snabbköp</td>
                        <td>Christina Berglund</td>
                        <td>Sweden</td>
                    </tr>
                    <tr>
                        <td>Centro comercial Moctezuma</td>
                        <td>Francisco Chang</td>
                        <td>Mexico</td>
                    </tr>
                    <tr className='alt'>
                        <td>Ernst Handel</td>
                        <td>Roland Mendel</td>
                        <td>Austria</td>
                    </tr>
                    <tr>
                        <td>Island Trading</td>
                        <td>Helen Bennett</td>
                        <td>UK</td>
                    </tr>
                    <tr className='alt'>
                        <td>Königlich Essen</td>
                        <td>Philip Cramer</td>
                        <td>Germany</td>
                    </tr>
                    <tr>
                        <td>Laughing Bacchus Winecellars</td>
                        <td>Yoshi Tannamuri</td>
                        <td>Canada</td>
                    </tr>
                    <tr className='alt'>
                        <td>Magazzini Alimentari Riuniti</td>
                        <td>Giovanni Rovelli</td>
                        <td>Italy</td>
                    </tr>
                    <tr>
                        <td>North/South</td>
                        <td>Simon Crowther</td>
                        <td>UK</td>
                    </tr>
                    <tr className='alt'>
                        <td>Paris spécialités</td>
                        <td>Marie Bertrand</td>
                        <td>France</td>
                    </tr>
                </table>
            </>
        )
    }

    function BorderView() {
        return (
            <>
                <h1 className='chp-head'>5、边框属性</h1>
                <p className='none'>无边框。</p>
                <p className='dotted'>虚线边框。</p>
                <p className='dashed'>虚线边框。</p>
                <p className='solid'>实线边框。</p>
                <p className='double'>双边框。</p>
                <p className='groove'> 凹槽边框。</p>
                <p className='ridge'>垄状边框。</p>
                <p className='inset'>嵌入边框。</p>
                <p className='outset'>外凸边框。</p>
                <p className='hidden'>隐藏边框。</p>
                <p className='mix'>混合边框</p>
                <h6 className='desc'><strong>注意：</strong>border-color单独使用是不起作用的，必须得先使用border-style来设置边框样式。</h6>
            </>
        )
    }
    function BorderStyleView() {
        return (
            <>
                <div className='border-container'>

                    <div className='on-light'>
                        <button className='border-gradient border-gradient-purple'>
                            I have a gradient
                        </button>
                    </div>

                    <div className='on-dark'>
                        <button className='border-gradient border-gradient-purple'>
                            I have a gradient
                        </button>
                    </div>

                    <div className='on-light'>
                        <button className='border-gradient border-gradient-green'>
                            I have a gradient
                        </button>
                    </div>

                    <div className='on-dark'>
                        <button className='border-gradient border-gradient-green'>
                            I have a gradient
                        </button>
                    </div>

                    <div className='on-light'>
                        <button className='border-gradient border-gradient-green only-top'>
                            Top-Only
                        </button>
                    </div>

                    <div className='on-dark'>
                        <button className='border-gradient border-gradient-green only-top'>
                            Top-Only
                        </button>
                    </div>

                </div>
            </>
        )
    }
    return (
        <>
            <ScrollView>
                <SelectorId />
                <SelectorClass />
                <StyleSheet />
                <TableStyle />
                <BorderView />
                <BorderStyleView />
            </ScrollView>
        </>
    )
}