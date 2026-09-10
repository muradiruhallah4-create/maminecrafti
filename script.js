/* =========================================
   ماماینکرافتی
   Coin + Advertisement + Shop System
========================================= */


/* =========================================
   تنظیمات
========================================= */

const REWARD_COINS = 25;

const AD_TIME = 10;

let coins = Number(
    localStorage.getItem("maminecrafti_coins")
);


/* =========================================
   اگر کاربر اولین بار وارد شد
========================================= */

if (
    !Number.isFinite(coins) ||
    coins < 0
) {
    coins = 100;

    saveCoins();
}


/* =========================================
   عناصر HTML
========================================= */

const coinBalance =
    document.getElementById("coinBalance");

const accountCoins =
    document.getElementById("accountCoins");

const watchAdButton =
    document.getElementById("watchAdButton");

const adMessage =
    document.getElementById("adMessage");

const buyButtons =
    document.querySelectorAll(".buy-button");


/* =========================================
   ذخیره سکه
========================================= */

function saveCoins() {

    localStorage.setItem(
        "maminecrafti_coins",
        coins
    );
}


/* =========================================
   نمایش سکه
========================================= */

function updateCoins() {

    coinBalance.textContent = coins;

    accountCoins.textContent = coins;
}


/* =========================================
   افزایش سکه
========================================= */

function addCoins(amount) {

    coins += amount;

    saveCoins();

    updateCoins();
}


/* =========================================
   کم کردن سکه
========================================= */

function removeCoins(amount) {

    if (coins < amount) {

        return false;
    }

    coins -= amount;

    saveCoins();

    updateCoins();

    return true;
}


/* =========================================
   تبلیغ دمو
========================================= */

watchAdButton.addEventListener(
    "click",
    function () {

        if (
            watchAdButton.disabled
        ) {
            return;
        }


        watchAdButton.disabled = true;

        let remaining = AD_TIME;


        adMessage.textContent =
            "📺 تبلیغ در حال پخش... " +
            remaining +
            " ثانیه";


        const timer =
            setInterval(
                function () {

                    remaining--;


                    if (remaining > 0) {

                        adMessage.textContent =
                            "📺 تبلیغ در حال پخش... " +
                            remaining +
                            " ثانیه";

                    } else {

                        clearInterval(timer);


                        addCoins(
                            REWARD_COINS
                        );


                        adMessage.textContent =
                            "✅ تبلیغ کامل شد! +" +
                            REWARD_COINS +
                            " سکه دریافت کردی.";


                        watchAdButton.disabled =
                            false;
                    }

                },
                1000
            );
    }
);


/* =========================================
   خرید اسکریپت
========================================= */

buyButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const price =
                    Number(
                        button.dataset.price
                    );

                const scriptName =
                    button.dataset.name;


                /* -------------------------
                   بررسی قیمت
                ------------------------- */

                if (
                    !Number.isFinite(price) ||
                    price <= 0
                ) {

                    alert(
                        "خطا در قیمت اسکریپت!"
                    );

                    return;
                }


                /* -------------------------
                   بررسی موجودی
                ------------------------- */

                if (coins < price) {

                    const needed =
                        price - coins;


                    alert(
                        "❌ سکه کافی نداری!\n\n" +
                        "قیمت: " +
                        price +
                        " سکه\n" +
                        "موجودی: " +
                        coins +
                        " سکه\n" +
                        "نیاز داری: " +
                        needed +
                        " سکه بیشتر"
                    );


                    return;
                }


                /* -------------------------
                   خرید
                ------------------------- */

                const success =
                    removeCoins(price);


                if (!success) {

                    return;
                }


                alert(
                    "✅ خرید موفق!\n\n" +
                    "اسکریپت:\n" +
                    scriptName +
                    "\n\n" +
                    "هزینه: " +
                    price +
                    " سکه\n\n" +
                    "موجودی جدید: " +
                    coins +
                    " سکه"
                );

            }
        );

    }
);


/* =========================================
   اجرای اولیه
========================================= */

updateCoins();