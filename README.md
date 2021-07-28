# easy-webmention-js
A simple JavaScript library to serve Webmentions via Webmention.io

In your `<head />` include the following, after importing Bootstrap and jQuery:
https://ggirelli.github.io/easy-webmention-js/src/easy-webmention.js
```html
<script type="text/javascript" src="https://ggirelli.github.io/easy-webmention-js/src/easy-webmention.js"></script>
<link rel="stylesheet" ref="ggirelli.github.io/easy-webmention-js/src/easy-webmention.css" />
```

Then, place the following where you would like your webmentions to appear:

```html
<!-- WEBMENTIONS -->
<div id="webmentions-wrap"></div>
<script type="text/javascript">
    let EW_TAG = "{{ site.webmentions.tag }}";                // your webmention.io tag
    let EW_TARGET = "{{ site.url }}{{ page.url }}";           // URL to current page
    let EW_READ_MORE_URI = "{{ site.webmentions.help_page }}" // URL with page with instructions for lost users
    let EW_WRAP_ID = "#webmentions-wrap";
    $(function () { ew_init(); });
</script>
```
