"use strict";

const widgetPositionWa = "rightBottom";
let widgetPositionOffsetXWa = 10;
let widgetPositionOffsetYWa = 10;
let widgetPoweredbyTextWa =
    '<div class="xit-widget-wa-modal-brand">&copy;Powered by <a target="_BLANK" href="https://odder.in">Odder</a></div>';
const widgetVisisbilityWa = 99999999;
const modalBodyHtmlWa =
    '<div class="xit-widget-wa-modal-header d-flex flex-column"><div><span type="button" class="float-end" id="minusButton" ><i class="far fa-window-minimize"></i></span></div><div class="d-flex"><img src="https://bot-data.s3.ap-southeast-1.wasabisys.com/upload/2024/3/flowbuilder/flowbuilder-65142-1709477420.png" class="rounded mx-2" alt="..." width="30" height="30"><span class="mx-3 align-self-center">Whatsapp Chat</span></div></div><p class="xit-widget-wa-modal-welcome">Hi there ! How can we help?</p><a class="button" target="_BLANK" href="https://wa.me/917489853860?text=Hi+there%2C+I+need+some+information./start:fromSite/">Start Chat </a>' +
    widgetPoweredbyTextWa;

function executionHandlerWa() {
    setTimeout(function() {
        addStyleLinkWa("https://dash.botbiz.io/assets/css/widget-whatsapp.css");
        addStyleWa(
            '.xit-widget-wa-wrapper .button{text-decoration:none;border:none;border-radius:11.2px;-moz-border-radius:11.2px;-webkit-border-radius:11.2px;cursor:pointer;text-align:center;background:#00A884;color:#FFFFFF;font-size:14px;padding:13px 12px;margin:0 20px;display:block;font-family: "PTSans", sans-serif;}'
        );
        addStyleWa(
            ".xit-widget-wa-wrapper .button:hover{background:#128C7E;color:#FFFDDD;}>"
        );
        addStyleWa(".xit-widget-wa-wrapper .button:focus{outline:none}");
        addStyleWa(
            ".xit-widget-wa-modal-header {background-color:#00A884;color:#FFFFFF}"
        );

        createButtonWithModalWa(modalBodyHtmlWa);
    }, 1000);

    setTimeout(function() {
        const modalElement = document.getElementById("xit-widget-wa-modal");
        modalElement.style.display = "none";
    }, 1100);
}

function addStyleLinkWa(url) {
    var head = document.head;
    var link = document.createElement("link");

    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = url;

    head.appendChild(link);
}

function addStyleWa(css_content) {
    var head = document.head;
    var style_tag = document.createElement("style");
    style_tag.textContent = css_content;
    head.appendChild(style_tag);
}

function createButtonWithModalWa(modalBodyHtmlWa) {
    const wrapper = document.createElement("div");
    wrapper.className = "xit-widget-wa-wrapper";

    const floatingButton = document.createElement("div");
    floatingButton.className = "xit-widget-wa-button";
    floatingButton.addEventListener("click", toggleModalWa);

    fixWidgetPositionWa(floatingButton, null);
    floatingButton.style.zIndex = parseInt(widgetVisisbilityWa, 10);

    wrapper.appendChild(floatingButton);

    const modal = createModalWa(modalBodyHtmlWa);
    wrapper.appendChild(modal);

    setTimeout(function() {
        const minusButton = document.getElementById("minusButton");
        minusButton.addEventListener("click", toggleModalWa);
    }, 1100);

    document.body.appendChild(wrapper);
}

function toggleModalWa() {
    const element = document.getElementById("xit-widget-wa-modal");
    if (isHiddenWa(element)) {
        element.style.display = "block";
        setTimeout(() => {
            element.style.opacity = "1";
        }, 10);
    } else {
        element.style.opacity = "0";
        element.style.display = "none";
    }
}

function isHiddenWa(el) {
    const style = window.getComputedStyle(el);
    return style.display === "none";
}

function createModalWa(html) {
    const modal = document.createElement("div");
    modal.style.display = "none";
    modal.id = "xit-widget-wa-modal";

    fixWidgetPositionWa(modal, "modal");
    modal.style.zIndex = parseInt(widgetVisisbilityWa, 10);

    const child = document.createElement("div");
    child.innerHTML = html;
    child.className = "xit-widget-wa-modal-content";

    modal.appendChild(child);

    return modal;
}

function fixWidgetPositionWa(element, type) {
    let {
        positionWa,
        widgetPositionOffsetXWa: offsetXWa,
        widgetPositionOffsetYWa: offsetYWa,
    } = getValidPositionsAndOffsetsWa();

    offsetYWa = "modal" === type ? offsetYWa + 80 : offsetYWa;

    if ("leftTop" === positionWa) {
        element.style.top = offsetYWa + "px";
        element.style.left = offsetXWa + "px";
    } else if ("leftBottom" === positionWa) {
        element.style.left = offsetXWa + "px";
        element.style.bottom = offsetYWa + "px";
    } else if ("rightTop" === positionWa) {
        element.style.top = offsetYWa + "px";
        element.style.right = offsetXWa + "px";
    } else if ("rightBottom" === positionWa) {
        element.style.right = offsetXWa + "px";
        element.style.bottom = offsetYWa + "px";
    }
}

function getValidPositionsAndOffsetsWa() {
    const positions = ["leftTop", "leftBottom", "rightTop", "rightBottom"];
    const positionWa =
        positions.indexOf(widgetPositionWa) > -1 ? widgetPositionWa : "rightBottom";

    widgetPositionOffsetXWa =
        parseInt(widgetPositionOffsetXWa, 10) < 0 ?
        50 :
        parseInt(widgetPositionOffsetXWa, 10);

    widgetPositionOffsetYWa =
        parseInt(widgetPositionOffsetYWa, 10) < 0 ?
        50 :
        parseInt(widgetPositionOffsetYWa, 10);

    return {
        positionWa,
        widgetPositionOffsetXWa,
        widgetPositionOffsetYWa,
    };
}

(function() {
    document.readyState !== "loading" ?
        executionHandlerWa() :
        document.addEventListener("DOMContentLoaded", function() {
            const pathname = window.location.pathname;

            if (pathname !== "/") {
                console.log(document.getElementsByClassName("navbar")[0]);
            } else executionHandlerWa();
        });
})();