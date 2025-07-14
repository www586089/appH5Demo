import './site.scss'

export default function WebSite() {

    return (
        <>
            <ul className='topmenu'>
                <li><a href='#home' className='active'>主页</a></li>
                <li><a href='#news'>新闻</a></li>
                <li><a href='#contact'>联系我们</a></li>
                <li><a href='#about'>关于我们</a></li>
            </ul>

            <div className='clearfix'>
                <div className='column sidemenu'>
                    <ul>
                        <li><a href='#flight'>The Flight</a></li>
                        <li><a href='#city' className='active'>The City</a></li>
                        <li><a href='#island'>The Island</a></li>
                        <li><a href='#food'>The Food</a></li>
                        <li><a href='#people'>The People</a></li>
                        <li><a href='#history'>The History</a></li>
                        <li><a href='#oceans'>The Oceans</a></li>
                    </ul>
                </div>

                <div className='column content'>
                    <div className='header'>
                        <h1>The City</h1>
                    </div>
                    <h1>Chania</h1>
                    <p>Chania is the capital of the Chania region on the island of Crete. The city can be divided in two parts, the old town and the modern city.</p>
                    <p>You will learn more about responsive web pages in a later chapter.</p>
                </div>
            </div>

            <div className='footer'>
                <p>底部文本</p>
            </div>

        </>
    )
}