# easy-webmention-js
A simple JavaScript library to serve Webmentions via Webmention.io

In your `<head />` include the following, after importing Bootstrap and jQuery:

```html
<script type="text/js" src="https://raw.githubusercontent.com/ggirelli/easy-webmention-js/main/src/easy-webmention.js"></script>
<link rel="stylesheet" ref="https://raw.githubusercontent.com/ggirelli/easy-webmention-js/main/src/easy-webmention.css" />
```

Then, place the following where you would like your webmentions to appear:

```html
<!-- WEBMENTIONS -->
<div id="webmentions-wrap"></div>
<script type="text/javascript">
    let WEBMENTIONS_FEED_URI = "https://webmention.io/api/mentions.jf2?target={{ site.url }}{{ page.url }}";
    let WEBMENTIONS_ID = "webmentions-wrap";
    $(function () {
        $.get(WEBMENTIONS_FEED_URI + "&wm-property=in-reply-to", {}, process_inreply_query_response);
    });
</script>
```
