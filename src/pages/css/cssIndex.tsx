import { ScrollView, View } from "@tarojs/components";
import { useRef, useState } from "react";
import './index.scss'
import cssBg from '../../media/w3css.gif'
import klematis_small from '../../media/klematis_small.jpg'
import klematis2_small from '../../media/klematis2_small.jpg'
import klematis3_small from '../../media/klematis3_small.jpg'
import klematis4_small from '../../media/klematis4_small.jpg'
import WebSite from "./WebSite";
import NumericKeyboard from "./keyboard/NumericKeyboard";
import SecureInputKeyboard from "./keyboard/SecureInputKeyboard";


export default function Index() {

    function SelectorId() {
        return (
            <>
                <div>
                    <h1 className='chp-head'>1、id选择器334</h1>
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
    function OutLineView() {
        return (
            <>
                <h1 className='chp-head'>6、轮廓属性</h1>
                <div className='outline'>
                    <p className='dotted1'>点线轮廓</p>
                    <p className='dashed1'>虚线轮廓</p>
                    <p className='solid1'>实线轮廓</p>
                    <p className='double1'>双线轮廓</p>
                    <p className='groove1'>凹槽轮廓</p>
                    <p className='ridge1'>垄状轮廓</p>
                    <p className='inset1'>嵌入轮廓</p>
                    <p className='outset1'>外凸轮廓</p>
                    <p className='desc'>轮廓（outline）是绘制于元素周围的一条线，位于边框边缘的外围，可起到突出元素的作用。<b>注意:</b> 如果只有一个 !DOCTYPE 指定 IE 8 支持 outline 属性。</p>
                </div>
            </>
        )
    }

    function CssGroupView() {
        return (
            <>
                <h1 className='chp-head'>7、css分组与嵌套</h1>
                <p>这个段落是蓝色文本，居中对齐。</p>
                <div className='marked'>
                    <p>这个段落不是蓝色文本。</p>
                </div>
                <p>所有 class=&rdquo;marked&rdquo;元素内的 p 元素指定一个样式，但有不同的文本颜色。</p>

                <p className='marked'>带下划线的 p 段落。</p>
            </>
        )

    }

    function DisplayOrHiddenView() {
        return (
            <>
                <h1 className='chp-head'>8、显示与隐藏</h1>
                <h4>这是一个可见标题</h4>
                <h4 className='hidden'>1 这是一个隐藏标题Hidden</h4>
                <h4 className='none1'>2 这是一个隐藏标题None</h4>
                <p className='desc'>注意, 实例中的隐藏标题不占用空间。</p>

            </>
        )
    }

    function DisplayBlockInlineView() {
        return (
            <>
                <h1 className='chp-head'>9、CSS Display - 块和内联元素</h1>
                <div className='desc'>
                    块元素是一个元素，占用了全部宽度，在前后都是换行符(比如：h1 div p)。内联元素只需要必要的宽度，不强制换行(比如：span a)。
                </div>
            </>
        )
    }

    function PositionStaticView() {
        return (
            <>
                <h1 className='chp-head'>10、CSS Position - 静态定位</h1>
                <h2>position: static;</h2>

                <p>使用 position: static; 定位的元素，无特殊定位，遵循正常的文档流对象:</p>

                <div className='static'>
                    该元素使用了 position: static;
                </div>
                <div className='desc'>
                    HTML 元素的默认值，即没有定位，遵循正常的文档流对象。
                    静态定位的元素不会受到 top, bottom, left, right影响。
                </div>
            </>
        )
    }

    function PositionFixedView() {
        return (
            <>
                <h1 className='chp-head'>11、CSS Position - 固定定位</h1>
                <p className='pos_fixed'>Some more text</p>
                <p><b>注意:</b> IE7 和 IE8 支持只有一个 !DOCTYPE 指定固定值.</p>
                <p>Some text</p><p>Some text</p><p>Some text</p><p>Some text</p><p>Some text</p><p>Some text</p><p>Some text</p><p>Some text</p><p>Some text</p><p>Some text</p><p>Some text</p><p>Some text</p><p>Some text</p><p>Some text</p><p>Some text</p><p>Some text</p>
                <div className='desc'>
                    元素的位置相对于浏览器窗口是固定位置。即使窗口是滚动的它也不会移动：Fixed定位使元素的位置与文档流无关，因此不占据空间。Fixed定位的元素和其他元素重叠。
                </div>
            </>
        )
    }

    function PositionRelativeView() {
        return (
            <>
                <h1 className='chp-head'>12、CSS Position - 相对定位</h1>
                <h2>这是位于正常位置的标题</h2>
                <h2 className='pos_left'>这个标题相对于其正常位置向左移动</h2>
                <h2 className='pos_right'>这个标题相对于其正常位置向右移动</h2>

                <h2>这是一个没有定位的标题</h2>
                <h2 className='pos_top'>这个标题是根据其正常位置向上移动</h2>
                <p><b>注意:</b> 即使相对定位元素的内容是移动,预留空间的元素仍保存在正常流动。</p>

                <div className='desc'>
                    <p>1 相对定位会按照元素的原始位置对该元素进行移动（相对定位元素的定位是相对其正常位置。）。</p>
                    <p>2 样式 &rdquo;left:-20px&rdquo; 从元素的原始左侧位置减去 20 像素。</p>
                    <p>3 样式 &ldquo;left:20px&rdquo; 向元素的原始左侧位置增加 20 像素。</p>
                    <p>4 移动相对定位元素，但它原本所占的空间不会改变。</p>
                    <p>5 相对定位元素经常被用来作为绝对定位元素的容器块。</p>
                </div>
            </>
        )
    }

    function PositionAbsoluteView() {
        return (
            <>
                <h1 className='chp-head'>13、CSS Position - 绝对定位</h1>
                <div className='position_relative'>
                    <h2 className='pos_absolute'>这是一个绝对定位了的标题</h2>
                    <p>用绝对定位,一个元素可以放在页面上的任何位置。标题下面放置距离左边的页面100 px和距离页面的顶部150 px的元素。.</p>
                </div>

                <div className='desc'>
                    <p>1 相对定位元素被用来作为绝对定位元素的容器块。</p>
                    <p>2 绝对定位的元素的位置相对于最近的已定位父元素，如果元素没有已定位的父元素，
                        那么它的位置相对于html:absolute 定位使元素的位置与文档流无关，
                        因此不占据空间。absolute 定位的元素和其他元素重叠。
                    </p>
                </div>
            </>
        )
    }

    function PositionStickyView() {
        return (
            <>
                <h1 className='chp-head'>14、CSS Position - 粘性定位</h1>
                <p>尝试滚动页面。</p>
                <p>注意: IE/Edge 15 及更早 IE 版本不支持 sticky 属性。</p>

                <div className='sticky'>我是粘性定位!</div>

                <div className='pad-bottom'>
                    <p>滚动我</p>
                    <p>来回滚动我</p>
                    <p>滚动我</p>
                    <p>来回滚动我</p>
                    <p>滚动我</p>
                    <p>来回滚动我</p>
                </div>
                <div className='desc'>
                    <p>sticky 英文字面意思是粘，粘贴，所以可以把它称之为粘性定位。position: sticky;
                        基于用户的滚动位置来定位。粘性定位的元素是依赖于用户的滚动，在 position:relative
                        与 position:fixed 定位之间切换。它的行为就像 position:relative; 而当页面滚动超出
                        目标区域时，它的表现就像 position:fixed;，它会固定在目标位置。元素定位表现为在跨越
                        特定阈值前为相对定位，之后为固定定位。这个特定阈值指的是 top, right, bottom 或 left
                        之一，换言之，指定 top, right, bottom 或 left 四个阈值其中之一，才可使粘性定位生效。
                        否则其行为与相对定位相同。
                    </p>
                </div>
            </>
        )
    }

    function ZIndexView() {
        return (
            <>
                <h1 className='chp-head'>15、CSS z-index</h1>
                <div className='z-index'>
                    <h1>This is a heading</h1>
                    <img src={cssBg} width='200' height='280' />
                    <p>因为图像元素设置了 z-index 属性值为 -1, 所以它会显示在文字之后。</p>
                </div>
                <div className='desc'>
                    元素的定位与文档流无关，所以它们可以覆盖页面上的其它元素z-index属性指定了一个元素的堆叠顺序（哪个元素应该放在前面，或后面）
                    一个元素可以有正数或负数的堆叠顺序：具有更高堆叠顺序的元素总是在较低的堆叠顺序元素的前面。
                    <b>注意：</b> 如果两个定位元素重叠，没有指定z-index，最后定位在HTML代码中的元素将被显示在最前面。
                </div>
            </>
        )
    }

    function OverflowView() {
        return (
            <>
                <h1 className='chp-head'>16、CSS overflow</h1>
                <h1>overflow 属性</h1>

                <p>如果元素中的内容超出了给定的宽度和高度属性，overflow 属性可以确定是否显示滚动条等行为。</p>

                <h2>overflow: scroll:</h2>
                <div className='ex1'>菜鸟教程 -- 学的不仅是技术，更是梦想！！！菜鸟教程 -- 学的不仅是技术，更是梦想！！！菜鸟教程 -- 学的不仅是技术，更是梦想！！！菜鸟教程 -- 学的不仅是技术，更是梦想！！！</div>

                <h2>overflow: hidden:</h2>
                <div className='ex2'>菜鸟教程 -- 学的不仅是技术，更是梦想！！！菜鸟教程 -- 学的不仅是技术，更是梦想！！！菜鸟教程 -- 学的不仅是技术，更是梦想！！！菜鸟教程 -- 学的不仅是技术，更是梦想！！！</div>

                <h2>overflow: auto:</h2>
                <div className='ex3'>菜鸟教程 -- 学的不仅是技术，更是梦想！！！菜鸟教程 -- 学的不仅是技术，更是梦想！！！菜鸟教程 -- 学的不仅是技术，更是梦想！！！菜鸟教程 -- 学的不仅是技术，更是梦想！！！</div>

                <h2>overflow: visible (默认):</h2>
                <div className='ex4'>菜鸟教程 -- 学的不仅是技术，更是梦想！！！菜鸟教程 -- 学的不仅是技术，更是梦想！！！菜鸟教程 -- 学的不仅是技术，更是梦想！！！菜鸟教程 -- 学的不仅是技术，更是梦想！！！</div>
                <div className='desc'>
                    <b>注意:</b>overflow 属性只工作于指定高度的块元素上。
                    visible	默认值。内容不会被修剪，会呈现在元素框之外。
                    hidden	内容会被修剪，并且其余内容是不可见的。
                    scroll	内容会被修剪，但是浏览器会显示滚动条以便查看其余的内容。
                    auto	如果内容被修剪，则浏览器会显示滚动条以便查看其余的内容。
                    inherit	规定应该从父元素继承 overflow 属性的值。
                </div>
            </>
        )
    }

    function ClipAbsoluteView() {
        return (
            <>
                <h1 className='chp-head'>17、CSS clip</h1>
                <img src={cssBg} width='100' height='140' className='clip' />
                <div className='desc descA'>
                    <b>注意:</b>感觉clip 这个属性只能裁剪绝对定位元素
                </div>
            </>
        )
    }

    function CSSFloatTestView() {
        return (
            <>
                <h1 className='chp-head'>18、CSS float</h1>
                <p>在下面的段落中，我们添加了一个 <b>float:right</b> 的图片。导致图片将会浮动在段落的右边。</p>
                <p>
                    <img src={klematis_small} width='95' height='84' className='floatTest' />
                    <p className='beatuful'>
                        这是一些文本。这是一些文本。这是一些文本。
                        这是一些文本。这是一些文本。这是一些文本。
                        这是一些文本。这是一些文本。这是一些文本。
                        这是一些文本。这是一些文本。这是一些文本。
                        这是一些文本。这是一些文本。这是一些文本。
                        这是一些文本。这是一些文本。这是一些文本。
                        这是一些文本。这是一些文本。这是一些文本。
                        这是一些文本。这是一些文本。这是一些文本。
                        这是一些文本。这是一些文本。这是一些文本。
                        这是一些文本。这是一些文本。这是一些文本。
                    </p>
                    <div className='desc'>
                        <p>1 CSS 的 Float（浮动），会使元素向左或向右移动，其周围的元素也会重新排列。Float（浮动），
                            往往是用于图像，但它在布局时一样非常有用。元素的水平方向浮动，意味着元素只能左右移动而不能
                            上下移动。一个浮动元素会尽量向左或向右移动，直到它的外边缘碰到包含框或另一个浮动框的边框为止。
                            浮动元素之后的元素将围绕它。浮动元素之前的元素将不会受到影响。如果图像是右浮动，上面的文本流将
                            环绕在它左边：</p>
                        <p>
                            2 如果你把几个浮动的元素放到一起，如果有空间的话，它们将彼此相邻。在这里，我们对图片廊使用 float 属性：
                        </p>
                    </div>
                </p>
                <h3>图片库</h3>
                <p>试着调整窗口,看看当图片没有足够的空间会发生什么。</p>
                <img className='thumbnail' src={klematis_small} />
                <img className='thumbnail' src={klematis2_small} />
                <img className='thumbnail' src={klematis3_small} />
                <img className='thumbnail' src={klematis4_small} />
                <img className='thumbnail' src={klematis_small} />
                <img className='thumbnail' src={klematis2_small} />
                <img className='thumbnail' src={klematis3_small} />
                <img className='thumbnail' src={klematis4_small} />
                <div className='desc clear-float'>
                    <p>
                        1 如果你把几个浮动的元素放到一起，如果有空间的话，它们将彼此相邻。
                        在这里，我们对图片廊使用 float 属性：
                    </p>
                    <p>
                        2 元素浮动之后，周围的元素会重新排列，为了避免这种情况，使用 clear 属性。
                        clear 属性指定元素两侧不能出现浮动元素。使用 clear 属性往文本中添加图片廊：
                    </p>
                </div>

                <p>

                    <span className='funny-span'>这</span>是一些文本。
                    这是一些文本。这是一些文本。
                    这是一些文本。这是一些文本。这是一些文本。
                    这是一些文本。这是一些文本。这是一些文本。
                    这是一些文本。这是一些文本。这是一些文本。
                    这是一些文本。这是一些文本。这是一些文本。
                    这是一些文本。这是一些文本。这是一些文本。
                    这是一些文本。这是一些文本。这是一些文本。
                </p>

                <p className='desc'>
                    在上面的段落中, 第一个字嵌入在span 元素中。
                    这个 span 元素的宽度是当前字体大小的1.2倍。
                    这个 span 元素是当前字体的400%(相当大)， line-height 为80%。
                    文字的字体为&rdquo;Algerian&rdquo;。
                </p>
            </>
        )
    }

    function CssAlignView() {
        return (
            <>
                <h1 className='chp-head'>19、CSS align</h1>
                <h1 className='chp-head'>19.1、元素居中对齐</h1>
                <h2>元素居中对齐</h2>
                <p>水平居中块级元素 (如 div), 可以使用 margin: auto;</p>

                <div className='acenter'>
                    <p><b>注意: </b>使用 margin:auto 无法兼容 IE8, 除非 !DOCTYPE 已经声明。</p>
                </div>
                <div className='desc'>
                    <p>1 注意: 如果没有设置 width 属性(或者设置 100%)，居中对齐将不起作用。</p>
                    <p>
                        2 要水平居中对齐一个元素(如 div), 可以使用 margin: auto;设置元素的宽度将防止它溢出到容器的边缘。元素通过指定宽度，并将两边的空外边距平均分配：
                    </p>
                </div>

                <h1 className='chp-head'>19.2、文本居中对齐</h1>
                <div className='tcenter'>
                    <p>文本居中对齐。</p>
                </div>
                <div className='desc'>
                    如果仅仅是为了文本在元素内居中对齐，可以使用 text-align: center;
                </div>

                <h1 className='chp-head'>19.3、图片居中对齐</h1>
                <h2>图片居中对齐</h2>
                <p>要让图片居中对齐, 可以使用 margin: auto; 并将它放到块元素中：</p>

                <img src={klematis_small} alt='Paris' className='icenter' />


                <div className='desc'>
                    要让图片居中对齐, 可以使用 margin: auto; 并将它放到 块 元素中:
                    要居中对齐图片，需要设置 display: block; margin: 0 auto;
                </div>

                <h1 className='chp-head'>19.4、左右对齐 - 使用定位方式</h1>
                <h2>右对齐</h2>
                <p>以下实例演示了如何使用 position 来实现右对齐:</p>

                <div className='aright'>
                    <p>菜鸟教程 -- 学的不仅是技术，更是梦想！！</p>
                </div>
                <div className='desc'>
                    <p>1 我们可以使用 position: absolute; 属性来对齐元素:</p>
                    <p>2 注释：绝对定位元素会被从正常流中删除，并且能够交叠元素。提示: 当使用 position 来对齐元素时,
                        通常 body 元素会设置 margin 和 padding 。 这样可以避免在不同的浏览器中出现可见的差异。
                        当使用 position 属性时，IE8 以及更早的版本存在一个问题。如果容器元素（在我们的案例中是
                        div class=&rdquo;container&rdquo;）设置了指定的宽度，并且省略了 !DOCTYPE 声明，那么
                        IE8 以及更早的版本会在右侧增加 17px 的外边距。这似乎是为滚动条预留的空间。当使用 position
                        属性时，请始终设置 !DOCTYPE 声明：
                    </p>
                </div>

                <div className='xcontainer'>
                    <div className='xright'>
                        <p><b>注意: </b>当使用浮动属性对齐,总是包括 !DOCTYPE 声明!如果丢失,它将会在 IE 浏览器产生奇怪的结果。</p>
                    </div>
                </div>

                <h1 className='chp-head'>19.5、左右对齐 - 使用浮动方式</h1>
                <h2>右对齐</h2>
                <p>以下实例演示了使用 float 属性来实现右对齐:</p>

                <div className='fright'>
                    <p>我老爹在小时候给我的一些人生建议，我现在还记忆深刻。</p>
                </div>
                <div className='desc'>
                    当像这样对齐元素时，对 body 元素的外边距和内边距进行预定义是一个好主意。这样可以避免在不同的浏览器中出现可见的差异。
                    注意：如果子元素的高度大于父元素，且子元素设置了浮动，那么子元素将溢出，这时候你可以使用 &rdquo;clearfix(清除浮动)&rdquo; 来解决该问题
                </div>
            </>
        )
    }

    const handleConfirm = (value) => {
        console.log('输入的值:', value);
        alert(`您输入了: ${value}`);
    };

    function KeyBoardView() {
        return (
            <>
                <div>
                    <h1>数字键盘示例</h1>
                    <NumericKeyboard
                      onConfirm={handleConfirm}
                      maxLength={5}
                    />
                </div>
            </>
        )
    }


    const inputRef = useRef(null);
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

    const handleInputChange = (e) => {
        console.log('当前值:', e.target.value);
    };

    function SecureNumberView() {
        return (
            <>
                <div>
                    <input
                      ref={inputRef}
                      type='text'
                      inputMode='none'  // 禁用系统键盘
                      onChange={handleInputChange}
                      placeholder='请使用安全键盘输入'
                    />
                    <SecureInputKeyboard
                      inputRef={inputRef}
                      maxLength={5}
                    />
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
                <OutLineView />
                <CssGroupView />
                <DisplayOrHiddenView />
                <DisplayBlockInlineView />

                <PositionStaticView />
                <PositionFixedView />
                <PositionRelativeView />
                <PositionAbsoluteView />
                <PositionStickyView />

                <ZIndexView />
                <OverflowView />
                <ClipAbsoluteView />
                <CSSFloatTestView />
                <WebSite />
                <CssAlignView />
                <KeyBoardView />
                <SecureNumberView />

            </ScrollView>
        </>
    )
}