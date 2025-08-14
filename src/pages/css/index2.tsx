
import './index2.scss'

export default function Index2() {

    function CssPClassView() {
        return (
            <>
                <div className='chp'>
                    1 Css伪类
                </div>

                <p><b><a href='/css/' target='_blank'>这是一个链接</a></b></p>
                <p><b>注意：</b> a:hover 必须在 a:link 和 a:visited 之后，需要严格按顺序才能看到效果。</p>
                <p><b>注意：</b> a:active 必须在 a:hover 之后。</p>

                <div id='divContainer'>
                    <p>开始</p>
                    <p>-----------</p>
                    <p>123</p>
                    <p>123</p>
                    <p>123</p>
                    <p>123</p>
                    <p>123</p>
                    <p>-----------</p>
                    <p>123</p>
                    <p>123</p>
                    <p>123</p>
                    <p>123</p>
                    <p>123</p>
                    <p>-----------</p>
                    <p>123</p>
                    <p>123</p>
                    <p>123</p>
                    <p>123</p>
                    <p>123</p>
                    <p>-----------</p>
                    <p>123</p>
                    <p>123</p>
                    <p>123</p>
                    <p>123</p>
                    <p>123</p>
                    <p>-----------</p>
                    <p>结束</p>
                </div>

                <div className='desc'>
                    <p>1 CSS伪类是用来添加一些选择器的特殊效果。</p>
                    <p>2 <b>注意：</b> 在CSS定义中，a:hover 必须被置于 a:link 和 a:visited 之后，才是有效的。</p>
                    <p>3 <b>注意：</b> 在 CSS 定义中，a:active 必须被置于 a:hover 之后，才是有效的。</p>
                    <p>4 <b>注意：</b> 伪类的名称不区分大小写。</p>
                    <p>5 伪类可以与 CSS 类配合使用</p>
                    <p>6 您可以使用 :first-child 伪类来选择父元素的第一个子元素。注意：在IE8的之前版本必须声明&lt;!DOCTYPE&gt; ，这样 :first-child 才能生效。</p>
                </div>
            </>
        )
    }


    function CssPElementView() {
        return (
            <>
                <div className='chp'>
                    2 Css伪元素
                </div>
                <div id='firstline'>
                    <p>你可以使用 &rdquo;first-line&rdquo; 伪元素向文本的首行设置特殊样式。在当前这个例子中，浏览器会根据 &rdquo;first-line&rdquo; 伪元素中的样式对 p 元素的第一行文本进行格式化：</p>
                </div>
                <div id='firstleter'>
                    <p>你可以使用 &rdquo;first-letter&rdquo; 伪元素向文本的首字母设置特殊样式：</p>
                </div>
                <div id='pEAndClass'>
                    <p className='article'>你可以使用 &rdquo;first-letter&rdquo; 伪元素结合伪类向文本的首字母设置特殊样式</p>
                </div>
                <div className='desc'>
                    <p>1 注意：&rdquo;first-line&rdquo; 伪元素只能用于块级元素。</p>
                    <p>2 注意： &rdquo;first-letter&rdquo; 伪元素只能用于块级元素。</p>
                    <p>3 伪类选择元素基于的是当前元素处于的状态，或者说元素当前所具有的特性，而不是元素的id、class、属性等静态的标志。
                        由于状态是动态变化的，所以一个元素达到一个特定状态时，它可能得到一个伪类的样式；当状态改变时，它又会失去这个样
                        式。由此可以看出，它的功能和class有些类似，但它是基于文档之外的抽象，所以叫伪类。与伪类针对特殊状态的元素不同
                        的是，伪元素是对元素中的特定内容进行操作，它所操作的层次比伪类更深了一层，也因此它的动态性比伪类要低得多。实际
                        上，设计伪元素的目的就是去选取诸如元素内容第一个字（母）、第一行，选取某些内容前面或后面这种普通的选择器无法完
                        成的工作。它控制的内容实际上和元素是相同的，但是它本身只是基于元素的抽象，并不存在于文档中，所以叫伪元素。
                    </p>
                </div>
            </>
        )
    }

    function NavView() {
        return (
            <>
                <div className='chp'>3 Nav导航</div>
                <ul id='navul'>
                    <li className='active'><a href='#home'>主页</a></li>
                    <li><a href='#news'>新闻</a></li>
                    <li><a href='#contact'>联系</a></li>
                    <li><a href='#about'>关于</a></li>
                </ul>

                <p>注意：这里我们用 href=&rdquo;#&rdquo;作为测试连接。但在一个真正的 web 站点上需要真实的 url。</p>

            </>
        )
    }

    function NavWebSiteView() {
        return (
            <>
                <div className='chp'>
                    3.1 导航条
                </div>

                <div id='website'>
                    <ul id='navul2'>
                        <li><a className='active' href='#home'>主页</a></li>
                        <li><a href='#news'>新闻</a></li>
                        <li><a href='#contact'>联系</a></li>
                        <li><a href='#about'>关于</a></li>
                    </ul>

                    <div id='cxx'>
                        <h2>Fixed Full-height Side Nav</h2>
                        <h3>Try to scroll this area, and see how the sidenav sticks to the page</h3>
                        <p>Notice that this div element has a left margin of 25%. This is because the side navigation is set to 25% width. If you remove the margin, the sidenav will overlay/sit on top of this div.</p>
                        <p>Also notice that we have set overflow:auto to sidenav. This will add a scrollbar when the sidenav is too long (for example if it has over 50 links inside of it).</p>
                        <p>Some text..</p>
                        <p>Some text..</p>
                        <p>Some text..</p>
                        <p>Some text..</p>
                        <p>Some text..</p>
                        <p>Some text..</p>
                        <p>Some text..</p>
                    </div>
                </div>
            </>
        )
    }

    function NavInlineView() {
        return (
            <>
                <div className='chp'>
                    3.2 内联导航条
                </div>
                <ul id='inline'>
                    <li><a href='#home'>主页</a></li>
                    <li><a href='#news'>新闻</a></li>
                    <li><a href='#contact'>联系</a></li>
                    <li><a href='#about'>关于</a></li>
                </ul>
                <div className='desc'>
                    <b>注意:</b>如果您只为 a 元素设置内边距（而不设置 ul 元素），那么链接会出现在 ul 元素之外。所以，我们为 ul 元素添加了 top 和 bottom 内边距。
                </div>
            </>
        )
    }

    function NavFloatView() {
        return (
            <>
                <div id='chp'>
                    3.3 浮动导航条
                </div>

                <ul id='float-view'>
                    <li><a href='#home' id='active'>Home</a></li>
                    <li><a href='#news'>News</a></li>
                    <li><a href='#contact'>Contact</a></li>
                    <li><a href='#about'>About</a></li>
                </ul>

                <p><b>注意:</b> 如果 !DOCTYPE 没有定义, floating 可以产生意想不到的结果.</p>

                <p>背景颜色添加到链接中显示链接的区域。整个链接区域是可点击的,不仅仅是文本。</p>

                <p><b>注意:</b> overflow:hidden 添加到 ul 元素,以防止 li 元素列表的外出。.</p>

                <ul id='float-view2'>
                    <li><a href='#home'>主页</a></li>
                    <li><a href='#news'>新闻</a></li>
                    <li><a href='#contact'>联系</a></li>
                    <li><a href='#about'>关于</a></li>
                </ul>

                <ul id='nav'>
                    <li><a className='active' href='#home'>主页</a></li>
                    <li><a href='#news'>新闻</a></li>
                    <li><a href='#contact'>联系</a></li>
                    <li><a href='#about'>关于我们</a></li>
                </ul>


                <ul id='nav2'>
                    <li><a href='#home'>主页</a></li>
                    <li><a href='#news'>新闻</a></li>
                    <li><a href='#contact'>联系</a></li>
                    <li id='active'><a className='active' href='#about'>关于</a></li>
                </ul>

                <ul id='nav3'>
                    <li><a className='active' href='#home'>主页</a></li>
                    <li><a href='#news'>新闻</a></li>
                    <li><a href='#contact'>联系</a></li>
                    <li id='active'><a href='#about'>关于</a></li>
                </ul>
                <h1 className='desc'>下面是一个固定在顶部的导航条</h1>
                <ul id='nav4'>
                    <li><a className='active' href='#home'>主页</a></li>
                    <li><a href='#news'>新闻</a></li>
                    <li><a href='#contact'>联系</a></li>
                    <li><a href='#about'>关于</a></li>
                </ul>

                <div >
                    <h1 className='desc'>Fixed Top Navigation Bar</h1>
                    <h2>Scroll this page to see the effect</h2>
                    <h2>The navigation bar will stay at the top of the page while scrolling</h2>

                    <p>Some text some text some text some text..</p>
                    <p>Some text some text some text some text..</p>
                    <p>Some text some text some text some text..</p>
                    <p>Some text some text some text some text..</p>
                    <p>Some text some text some text some text..</p>
                    <p>Some text some text some text some text..</p>
                    <p>Some text some text some text some text..</p>
                    <p>Some text some text some text some text..</p>
                    <p>Some text some text some text some text..</p>
                    <p>Some text some text some text some text..</p>
                    <p>Some text some text some text some text..</p>
                    <p>Some text some text some text some text..</p>
                    <p>Some text some text some text some text..</p>
                    <p>Some text some text some text some text..</p>
                    <p>Some text some text some text some text..</p>
                    <p>Some text some text some text some text..</p>
                    <p>Some text some text some text some text..</p>
                    <p>Some text some text some text some text..</p>
                    <p>Some text some text some text some text..</p>
                    <p>Some text some text some text some text..</p>
                </div>

                <ul id='nav5'>
                    <li><a className='active' href='#home'>主页</a></li>
                    <li><a href='#news'>新闻</a></li>
                    <li><a href='#contact'>联系</a></li>
                    <li><a href='#about'>关于</a></li>
                </ul>



                <ul id='topnav'>
                    <li><a className='active' href='#home'>主页TopNav</a></li>
                    <li><a href='#news'>新闻</a></li>
                    <li><a href='#contact'>联系</a></li>
                    <li className='right'><a href='#about'>关于</a></li>
                </ul>

                <div id='topnav-div'>
                    <h2>响应式导航栏实例</h2>
                    <p>在屏幕宽度小于 600px 会重置导航栏。</p>
                    <h4>重置浏览器窗口大小，查看效果。</h4>
                </div>
            </>
        )
    }

    function SideNavView() {
        return (
            <>
                <div className='chp'>
                    3.4 侧边导航条
                </div>
                <ul className='sidenav'>
                    <li><a className='active' href='#home'>主页</a></li>
                    <li><a href='#news'>新闻</a></li>
                    <li><a href='#contact'>联系</a></li>
                    <li><a href='#about'>关于</a></li>
                </ul>

                <div className='scontent'>
                    <h2>响应式边栏导航实例</h2>
                    <p>该实例在屏幕宽度小于 900px 时导航栏为顶部水平导航栏，如果大于 900px 导航栏会在左边，且是固定的。</p>
                    <p>如果屏幕宽度小于 400px 会变为垂直导航栏。</p>
                    <h3>重置浏览器窗口大小，查看效果。</h3>
                </div>

            </>
        )
    }

    function DropDownNavView() {
        return (
            <>
                <div className='chp'>
                    3.5 下拉导航条
                </div>

                <ul id='dropnav'>
                    <li><a href='#home' className='active'>主页</a></li>
                    <li><a href='#news'>新闻</a></li>
                    <li>
                        <div className='dropdown'> <a href='#' className='dropbtn'>下拉菜单</a>
                            <div className='dropdown-content'> <a href='#'>链接 1</a> <a href='#'>链接 2</a> <a href='#'>链接 3</a> </div>
                        </div>
                    </li>
                    <li><a href='#about'>关于</a></li>
                </ul>
                <h3 className='fakeHeight'>导航栏上的下拉菜单</h3>
                <p>鼠标移动到 &rdquo;下拉菜单&rdquo; 链接先显示下拉菜单。</p>


                <h2>鼠标移动后出现下拉菜单</h2>
                <p>将鼠标移动到指定元素上就能看到下拉菜单。</p>

                <div className='dropdown'>
                    <span className='spanbg'>鼠标移动到我这！</span>
                    <div className='dropdown-content'>
                        <p>菜鸟教程</p>
                        <p>www.runoob.com</p>
                    </div>
                    <h3 className='fakeHeight'>xx</h3>
                </div>

                <h2>下拉菜单</h2>
                <p>鼠标移动到按钮上打开下拉菜单。</p>
                <div className='dropdown2'>
                    <button className='dropbtn2'>下拉菜单下拉菜单下拉菜单下拉菜单</button>
                    <div className='dropdown2-content'>
                        <a href='https://www.runoob.com'>菜鸟教程 1</a>
                        <a href='https://www.runoob.com'>菜鸟教程 2</a>
                        <a href='https://www.runoob.com'>菜鸟教程 3</a>
                    </div>
                </div>
                <h3 className='fakeHeight'>xx</h3>
            </>
        )
    }

    function ToolTipsView() {
        return (
            <>
                <div className='chp'>
                    3.6 工具提示
                </div>

                <div className='tooltip'>1 鼠标移动到这
                    <span className='tooltiptext'>提示文本</span>
                </div>

                <h2>2 右侧提示工具</h2>
                <p>鼠标移动到以下元素:</p>

                <div className='tooltip2'>鼠标移动到我这
                    <span className='tooltiptext'>提示文本</span>
                </div>

                <h2>3 左侧提示工具</h2>
                <p>鼠标移动到以下元素:</p>

                <div className='tooltip3'>鼠标移动到我这
                    <span className='tooltiptext'>提示文本</span>
                </div>

                <h2>4 头部提示工具</h2>
                <p>鼠标移动到以下元素:</p>

                <div className='tooltip4'>鼠标移动到我这
                    <span className='tooltiptext'>提示文本</span>
                </div>

                <h2>5 底部提示工具</h2>
                <p>鼠标移动到以下元素:</p>

                <div className='tooltip5'>鼠标移动到我这
                    <span className='tooltiptext'>提示文本</span>
                </div>

                <h2>6 顶部提示框/底部箭头</h2>

                <div className='tooltip6'>鼠标移动到我这
                    <span className='tooltiptext'>提示文本</span>
                </div>


                <h2>7 底部提示框/顶部箭头</h2>

                <div className='tooltip7'>鼠标移动到我这
                    <span className='tooltiptext'>提示文本</span>
                </div>


                <h2>8 右侧提示框/左侧箭头</h2>

                <div className='tooltip8'>鼠标移动到我这
                    <span className='tooltiptext'>提示文本</span>
                </div>


                <h2>9 左侧提示框/右侧箭头</h2>
                <div className='tooltip9'>鼠标移动到我这
                    <span className='tooltiptext'>提示文本</span>
                </div>


                <h2>10 提示工具淡入效果</h2>
                <p>鼠标移动到以下元素，提示工具会再一秒内从 0% 到 100% 完全显示。</p>

                <div className='tooltip10'>鼠标移动到我这
                    <span className='tooltiptext'>提示文本</span>
                </div>


                <h2>11 漂亮的提示框</h2>
                <div className='wrapper'>
                    I have a tooltip.
                    <div className='tooltip'>I am a tooltip!</div>
                </div>
            </>
        )
    }


    function GalleryView() {
        return (
            <>
                <h2 style={{textAlign:'center'}}>3.7 响应式图片相册</h2>

                <div className='responsive'>
                    <div className='img'>
                        <a target='_blank' href='img_fjords.jpg'>
                            <img src='https://www.runoob.com/wp-content/uploads/2016/04/img_fjords.jpg' alt='Trolltunga Norway' width='300' height='200' />
                        </a>
                        <div className='desc'>Add a description of the image here</div>
                    </div>
                </div>


                <div className='responsive'>
                    <div className='img'>
                        <a target='_blank' href='img_forest.jpg'>
                            <img src='https://www.runoob.com/wp-content/uploads/2016/04/img_forest.jpg' alt='Forest' width='600' height='400' />
                        </a>
                        <div className='desc'>Add a description of the image here</div>
                    </div>
                </div>

                <div className='responsive'>
                    <div className='img'>
                        <a target='_blank' href='img_lights.jpg'>
                            <img src='https://www.runoob.com/wp-content/uploads/2016/04/img_lights.jpg' alt='Northern Lights' width='600' height='400' />
                        </a>
                        <div className='desc'>Add a description of the image here</div>
                    </div>
                </div>

                <div className='responsive'>
                    <div className='img'>
                        <a target='_blank' href='img_mountains.jpg'>
                            <img src='https://www.runoob.com/wp-content/uploads/2016/04/img_mountains.jpg' alt='Mountains' width='600' height='400' />
                        </a>
                        <div className='desc'>Add a description of the image here</div>
                    </div>
                </div>

                <div className='clearfix'></div>

                <div style={{padding: '6px'}}>

                    <h4>重置浏览器大小查看效果</h4>
                </div>

            </>
        )
    }

    return (
        <>
            <CssPClassView />
            <CssPElementView />
            <NavView />
            <NavWebSiteView />
            <NavInlineView />
            <NavFloatView />
            <SideNavView />
            <DropDownNavView />
            <ToolTipsView />
            <GalleryView />
        </>
    )
}