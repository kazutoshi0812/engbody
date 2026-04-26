// ============================================
// engbody / index.html
// ============================================

const SCROLL_TOP_SHOW_PX = 300;

/**
 * FAQ: 開閉時に transition が効くよう <details> に .is-open を付与
 */
function initFaqDetails() {
    $(".p-faq .faq-item").each(function () {
        const details = this;
        const $details = $(details);
        const $answer = $details.find(".faq-answer");

        if (details.open) {
            $details.addClass("is-open");
        }

        $details.on("click", function (e) {
            e.preventDefault();
            if ($details.hasClass("is-open")) {
                $details.removeClass("is-open");
                $answer.one("transitionend", function () {
                    details.open = false;
                });
            } else {
                details.open = true;
                requestAnimationFrame(function () {
                    requestAnimationFrame(function () {
                        $details.addClass("is-open");
                    });
                });
            }
        });
    });
}

/**
 * スタジオ: slick スライダー
 */
function initStudioSlider() {
    const $list = $(".p-studio__list");
    if (!$list.length) return;
    $list.slick({
        dots: true,
    });
}

/**
 * 料金: 横スクロールヒントの表示制御 + セクション再入場でスクロール位置リセット
 */
function initPriceScrollHint() {
    const wrapper = document.querySelector(".p-price__wrapper");
    const list = document.querySelector(".p-price-card__list");
    const hint = document.querySelector(".p-price-hint");

    if (!wrapper || !list || !hint) {
        return;
    }

    function hideHint() {
        if (!hint.classList.contains("is-hidden")) {
            hint.classList.add("is-hidden");
        }
    }

    function showHint() {
        if (wrapper.scrollLeft === 0) {
            hint.classList.remove("is-hidden");
        }
    }

    wrapper.addEventListener(
        "scroll",
        function () {
            if (wrapper.scrollLeft > 0) {
                hideHint();
            }
        },
        { passive: true },
    );

    const observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    wrapper.scrollTo({
                        left: 0,
                        behavior: "smooth",
                    });
                    setTimeout(showHint, 400);
                }
            });
        },
        {
            root: null,
            threshold: 0.3,
        },
    );

    observer.observe(list);
}

/**
 * フッター: ページ先頭へスクロール
 */
function initScrollTopButton() {
    const $scrollTopButton = $("#scroll-top");
    if ($scrollTopButton.length === 0) return;

    $(window).on("scroll", function () {
        if ($(window).scrollTop() > SCROLL_TOP_SHOW_PX) {
            $scrollTopButton.addClass("is-show");
        } else {
            $scrollTopButton.removeClass("is-show");
        }
    });

    $scrollTopButton.on("click", function (e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });

    $(window).trigger("scroll");
}

$(function () {
    initFaqDetails();
    initStudioSlider();
    initPriceScrollHint();
    initScrollTopButton();
});
