Sudi's Chrome Developer Tool
===================================

This is a tool designed to assist the Support team in common troubleshooting tasks.

## Installation

Simply clone this repository to your machine using the following: 
```bash
$ git clone https://github.com/masiddee/sudi-dev-tools.git
```

Next, visit chrome://extensions (via omnibox or Window -> Extensions). Enable Developer mode by ticking the checkbox in the upper-right corner. Click on the "Load unpacked extension..." button. Select the directory containing your unpacked extension (this will be located where ever your cloned repo is located)

The extension should now be ready to use.

## Using the extension

To use the extension, first navigate to any page with tracking code on it and bring up the Developer Tools. You should see an extra tab pop up titled "Sudi Developer Panel". Simply click the button to scrape the page, and you should see the panel populate with the following:

- Form Action Attribute (for forms not in an iframe)
- Any Account IDs
- Any Campaign IDs
- Any visitor_id cookies