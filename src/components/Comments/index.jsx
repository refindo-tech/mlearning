import Script from 'next/script';
const Comments = () => {
    return (
        <>
            <div id="disqus_thread"></div>
            <Script id="disqus_thread">
                {`
                    var disqus_config = function () {
                    this.page.url = document.location.href;  // Replace PAGE_URL with your page's canonical URL variable
                this.page.identifier = document.location.href.split('course/')[1]; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
                    };
                (function() { // DON'T EDIT BELOW THIS LINE
                        var d = document, s = d.createElement('script');
                s.src = 'https://mlearning-1.disqus.com/embed.js';
                s.setAttribute('data-timestamp', +new Date());
                (d.head || d.body).appendChild(s);
                })();`
                }
            </Script>
            <Script id="dsq-count-scr" src="//m-learning-1.disqus.com/count.js" async></Script>
            <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
        </>
    )
}
export default Comments