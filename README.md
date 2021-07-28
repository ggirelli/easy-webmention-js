# easy-webmention-js
A simple JavaScript library to serve Webmentions via Webmention.io

```html
<!-- WEBMENTIONS -->
<div id="webmentions-wrap"></div>
<script type="text/javascript">
    let WEBMENTIONS_FEED_URI = "https://webmention.io/api/mentions.jf2?target={{ site.url }}{{ page.url }}";
    let WEBMENTIONS_ID = "webmentions-wrap";
    $(function () {
        $.get(WEBMENTIONS_FEED_URI + "&wm-property=in-reply-to", {}, process_inreply_query_response});
    });
</script>
```
