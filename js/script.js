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

// ---------------------------------------------------------------------------
// 以下: 現行の index.html ではマークアップが無い／未使用のためコメントアウトして保持
// （別ページ追加時やデザイン差し替え時に参照）
// ---------------------------------------------------------------------------
/*
// main-visual の動画スライド（プレースホルダ）
$(function () {});

// ヘッダーの main-visual 追従（プレースホルダ）
$(function () {});

// ハンバーガーメニュー（要: .js-hamburger, .l-header__nav, .l-header__nav--list）
$(function () {
    $(".js-hamburger").click(function () {
        $(".js-hamburger").toggleClass("is-active");
        $(".l-header__nav").toggleClass("open");
        $(".l-header__nav--list").toggleClass("open");
    });
});

// .scroll_down 内リンクのスムーススクロール
$(function () {
    $(".scroll_down a").on("click", function (e) {
        e.preventDefault();
        const target = $(this).attr("href");
        if (!target) return;
        const $el = $(target);
        if ($el.length) {
            $("html, body").animate({ scrollTop: $el.offset().top }, 800, "swing");
        }
    });
});

// ふわっと表示（要: .js-fadein-left, .c-card--fadein, .section__* 等のマークアップ）
// ※ 旧実装では末尾で $(".p-studio__list").slick(...) も同一ブロック内にあった
$(function () {
    const FADE_OFFSET = 60;

    $(".p-service-page__card--list, .p-feature-page__card--list").each(function () {
        $(this)
            .find(".c-card--fadein")
            .each(function (index) {
                const $card = $(this);
                if (!$card.hasClass("fadein-left") && !$card.hasClass("fadein-right")) {
                    $card.addClass((index + 1) % 2 === 1 ? "fadein-right" : "fadein-left");
                }
            });
    });

    const applyFadeIn = (selector, useDelay = false) => {
        const wHeight = $(window).height();
        const scrollAmount = $(window).scrollTop();
        const threshold = wHeight - FADE_OFFSET;

        $(selector).each(function (i) {
            const $el = $(this);
            const inView = scrollAmount > $el.offset().top - threshold;
            if (useDelay && inView && !$el.hasClass("fadeIn")) {
                $el.delay(i * 400).queue(function (next) {
                    $el.addClass("fadeIn");
                    next();
                });
            } else if (inView) {
                $el.addClass("fadeIn");
            } else {
                $el.removeClass("fadeIn");
            }
        });
    };

    const fadeInSelectors = [
        ".js-fadein-left",
        ".c-card--fadein",
        ".section__contents--description",
        ".section__future--headline, .section__headline",
        ".profile-headline",
    ];

    $(window).scroll(function () {
        fadeInSelectors.forEach((sel) => applyFadeIn(sel));
        applyFadeIn(".future", true);
    });
});
*/
