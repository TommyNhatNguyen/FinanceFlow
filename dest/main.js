/*
TODO1: Scroll đổi màu background header
TODO2: Back to top
TODO3: Progress bar 
TODO4: Flickity
TODO5: Click hamburger hiện menu 
TODO6: Active đúng nav bar khi click chuyển trang 
TODO7: Loading
TODO8: Popup Video
TODOEXTRA: Animation
*/

/* 
------------------------------------------------------
.......................LIBRARY........................
------------------------------------------------------
*/
AOS.init();
// TODO7: Loading
function initLoading() {
  // Handle loading progress function
  function handleLoadingProgress(count, total) {
    let progress = Math.round((count * 100) / total);
    const progressLoading = document.querySelector(
      ".loading .loading__inner .loading__inner-progress span"
    );
    const progressLoadingText = document.querySelector(
      ".loading .loading__inner .loading__inner-text p"
    );
    // Change loading bar width
    progressLoading.style.width = `${progress}%`;
    // Text
    progressLoadingText.innerText = `${progress}%`;
    disableScroll();
  }

  // Handle loading done progress
  function handleLoadingDone() {
    const loading = document.querySelector(".loading");
    loading.classList.add("--is-loaded");
    enableScroll();
  }

  // Get all images
  const totalNumImages = document.querySelectorAll("img").length;
  const container = document.querySelector("body");
  let imgLoad = imagesLoaded(container);

  imgLoad
    .on("progress", (instance, img) => {
      let progress = instance.progressedCount;
      handleLoadingProgress(progress, totalNumImages);
    })
    .on("done", () => {
      handleLoadingDone();
    })
    .on("fail", () => {
      console.log("Something went wrong! Try refresh page.");
    });
}
initLoading();
/* 
------------------------------------------------------
..................GLOBAL VARIABLES....................
------------------------------------------------------
*/
const header = document?.querySelector(".header");
const backToTopBtn = document?.querySelector(".btnbtt");
const progressBar = document?.querySelector(".progress-bar");
const reviewSlider = document?.querySelector(".screview .screview__slider");
const menuMobile = document?.querySelector(".nav__mobile");
const videoPopup = document?.querySelector(".video");
const hamburger = document?.querySelector(
  ".header .header__cta .header__cta-hamburger"
);
const formSubscribe = document?.querySelector(
  ".scsubscribe .scsubscribe__form .scsubscribe__form-formgroup"
);
const tabItemsList = document?.querySelectorAll(
  ".sclastestpost .tabs .tabs__item"
);
const postItemsList = document?.querySelectorAll(
  ".sclastestpost .sclastestpost__posts .sclastestpost__posts-list"
);
const contentList = document?.querySelectorAll(
  ".scfaqs .scfaqs__inner .scfaqs__inner-list .content"
);
const body = document?.querySelector("body");
let scrollY;
window.addEventListener("scroll", () => {
  scrollY = window.scrollY;
});
/* 
------------------------------------------------------
..................REUSABLE FUNCTIONS..................
------------------------------------------------------
*/
function handleScrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
function disableScroll() {
  body.classList.add("--disable-scroll");
  progressBar.classList.add("--hide");
}
function enableScroll() {
  body.classList.remove("--disable-scroll");
  progressBar.classList.remove("--hide");
}
function showMenuMobile() {
  disableScroll();
  menuMobile.classList.add("--active");
  hamburger.classList.add("--active");
  backToTopBtn.classList.add("--hide");
}
function hideMenuMobile() {
  enableScroll();
  menuMobile.classList.remove("--active");
  hamburger.classList.remove("--active");
  backToTopBtn.classList.remove("--hide");
}
function validateEmail(email) {
  if (email !== null) {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  } else {
    return null;
  }
}
// TODO9: Check form subscribe
function handleFormSubscribe() {
  if (typeof formSubscribe != "undefined" && formSubscribe != null) {
    const inputSubscribe = formSubscribe.querySelector("input[type='text']");
    const btnSubmit = formSubscribe.querySelector(" .btnsubmit");
    const errorLabel = formSubscribe.parentElement.querySelector(".error");
    // Get input value
    function getInputValue() {
      inputSubscribe.addEventListener("change", (e) => {
        // Set user typing value to value attribute
        inputSubscribe.setAttribute("value", e.target.value);
      });
      inputSubscribe.addEventListener("keydown", () => {
        formSubscribe.classList.remove("--error");
        errorLabel.classList.remove("--show");
      });
    }
    getInputValue();

    // Handle error
    function handleError() {
      formSubscribe.classList.add("--error");
      if (
        inputSubscribe.getAttribute("value") === null ||
        inputSubscribe.getAttribute("value") === ""
      ) {
        errorLabel.innerText = "Please fill in this field";
      } else {
        errorLabel.innerText = "Email invalid. Please try again";
      }
      errorLabel.classList.add("--show");
    }

    // Handle submit
    function handleSubmit() {
      btnSubmit.addEventListener("click", (e) => {
        e.preventDefault();
        // Check if email
        let userEmail = inputSubscribe.getAttribute("value");
        if (validateEmail(userEmail) === null) {
          handleError();
        } else {
          window.alert("Subscribed!");
        }
      });
    }
    handleSubmit();
  }
}
handleFormSubscribe();
/* 
------------------------------------------------------
.......................HEADER........................
------------------------------------------------------
*/

// TODO1: Scroll change background color
function toggleHeaderBackgroundColor() {
  // Check if scroll pass header
  window.addEventListener("scroll", () => {
    scrollY > header.clientHeight
      ? header?.classList.add("--active-bg-cl")
      : header?.classList.remove("--active-bg-cl");
  });
}
toggleHeaderBackgroundColor();

// TODO3: Progress bar
function handleProgressBar() {
  // Set width for progress bar
  window.addEventListener("scroll", () => {
    let pageHeight = document.querySelector("body").offsetHeight;
    let windowInnerHeight = window.innerHeight;
    let progressBarWidth = Math.round(
      (scrollY * 100) / (pageHeight - windowInnerHeight)
    );
    progressBar.style.width = `${progressBarWidth}%`;
  });
}
handleProgressBar();

// TODO5: Hamburger
function handleHamburger() {
  // Toggle show/hide hamburger
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    !hamburger.classList.contains("--active")
      ? showMenuMobile()
      : hideMenuMobile();
  });
  // Hide menu window resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 920) {
      hideMenuMobile();
      hamburger.classList.remove("--active");
    }
  });
  // Hide menu window click
  document.addEventListener("click", hideMenuMobile);
}
handleHamburger();

// TODO6: Active menu item
function handleActiveMenuItem() {
  // Handle click function
  function handleClickItem(menuItems) {
    menuItems.forEach((item) => {
      const currentPageURL = window.location.href;
      if (item.href === currentPageURL) {
        item.setAttribute("aria-current", "page");
      }
      if (
        window.location.pathname === "/blog-detail.html" &&
        item.pathname === "/blog.html"
      ) {
        item.setAttribute("aria-current", "page");
      }
    });
  }
  // Desktop
  const headerNavMenuItems = document.querySelectorAll(
    ".header .header__nav .header__nav-menu li a"
  );
  handleClickItem(headerNavMenuItems);
  // Mobile
  const mobileNavMenuItems = document.querySelectorAll(
    ".nav__mobile .nav__mobile-menu li a"
  );
  handleClickItem(mobileNavMenuItems);
  // Footer
  const footerNavMenuItems = document.querySelectorAll(
    ".footer .footer__menu .footer__menu-nav .menu .menu__column a"
  );
  handleClickItem(footerNavMenuItems);
}
handleActiveMenuItem();
/* 
------------------------------------------------------
.......................FOOTER........................
------------------------------------------------------
*/
// TODO2: Back to top button
function handleBackToTopBtn() {
  // Show back to top button
  window.addEventListener("scroll", () => {
    let pageHeight = document?.querySelector("body").offsetHeight;
    let windowInnerHeight = window.innerHeight;
    let backToTopBtnPosition = Math.round(
      pageHeight - (scrollY + windowInnerHeight)
    );
    // Reset button position
    scrollY > pageHeight / 2
      ? (backToTopBtn.style.transform = `translateY(-${backToTopBtnPosition}px)`)
      : (backToTopBtn.style.transform = `translateY(0px)`);
  });
  // Click back to top
  backToTopBtn.addEventListener("click", handleScrollToTop);
}
handleBackToTopBtn();
/* 
------------------------------------------------------
.............REVIEW SECTION HOME PAGE.................
------------------------------------------------------
*/
// TODO4: Flickity
function handleSlider() {
  // Check if element exist
  if (typeof reviewSlider != "undefined" && reviewSlider != null) {
    const reviewSliderFlikity = new FlickityResponsive(reviewSlider, {
      wrapAround: true,
      prevNextButtons: false,
      draggable: true,
      setGallerySize: true,
      groupCells: 2,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            groupCells: 1,
          },
        },
      ],
    });
    // Reload cells to get max height
    window.addEventListener("resize", () => {
      reviewSliderFlikity.reloadCells();
    });
  }
}
handleSlider();

/* 
------------------------------------------------------
..............GETSTARTED SECTION HOME PAGE............
------------------------------------------------------
*/
// TODO8: Popup Video
function initPopup() {
  // Get video popup model
  if (typeof videoPopup != "undefined" && videoPopup != null) {
    const videoPopupFrame = videoPopup.querySelector(".video__inner iframe");
    const btnExit = document.querySelector(".video .video__inner .btnexit");
    const videoElement = document.querySelector(
      ".scgetstarted .scgetstarted__image"
    );
    // Handle popup video
    function handlePopup() {
      // Get video code
      const videoCode = videoElement.getAttribute("data-video-key");
      // Add video code when click video
      videoElement.addEventListener("click", (e) => {
        e.stopPropagation();
        // Show video pop up
        videoPopup.classList.add("--show");
        videoPopupFrame.setAttribute(
          "src",
          `https://www.youtube.com/embed/${videoCode}?controls=0&autoplay=1`
        );
        // Disable Scroll
        disableScroll();
      });
    }
    handlePopup();

    // Handle exit video
    function hidePopup() {
      btnExit.addEventListener("click", () => {
        videoPopup.classList.remove("--show");
        videoPopupFrame.setAttribute("src", "");
      });
      document.addEventListener("click", () => {
        videoPopup.classList.remove("--show");
        videoPopupFrame.setAttribute("src", "");
      });
    }
    hidePopup();
  }
}
initPopup();
/* 
------------------------------------------------------
.............LATEST POST SECTION BLOG PAGE............
------------------------------------------------------
*/
// TODO10: Tab js
function handleTabs() {
  let currentTab = "all";
  // Function remove all tabs
  function removeActiveTabs(tabList) {
    tabList.forEach((tab) => tab.classList.remove("--active"));
  }
  // Function active tab
  function addActiveTab(tab, tabSelected, postsList) {
    tab.classList.add("--active");
    // Show all posts in that tab
    postsList.forEach((item) => {
      // Get tab id
      let postTabId = item.getAttribute("data-tab");
      // Select post
      if (postTabId === tabSelected) {
        item.classList.add("--active");
      } else if (tabSelected === "all") {
        item.classList.add("--active");
      } else {
        item.classList.remove("--active");
      }
    });
  }
  // Click tabs
  tabItemsList.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Get selected tab
      currentTab = tab.innerText.toLowerCase();
      // Remove class from all tabs
      removeActiveTabs(tabItemsList);
      // Add active for selected tab
      addActiveTab(tab, currentTab, postItemsList);
      // Pagination
      let postsListActive = document.querySelectorAll(
        ".sclastestpost .sclastestpost__posts .sclastestpost__posts-list.--active"
      );
      showPageNumbers();
      clickPageNumbers(postsListActive);
      handleButtonStatus();
    });
  });
  // Select "All" tab as default when load
  window.addEventListener("load", () => {
    tabItemsList.forEach((tab) => {
      let tabSelected = tab.innerText.toLowerCase();
      // Add active for selected tab
      if (tabSelected === currentTab)
        addActiveTab(tab, tabSelected, postItemsList);
    });
  });
}
handleTabs();

// TODO11: Pagination
const btnNext = document.querySelector(
  ".sclastestpost .sclastestpost__posts .sclastestpost__posts-paging .btnnext"
);

if (typeof btnNext != "undefined" && btnNext != null) {
  function showPageNumbers() {
    let totalPageNumber = document.querySelectorAll(
      ".sclastestpost .sclastestpost__posts .sclastestpost__posts-list.--active"
    ).length;

    let pageNumberList = document.querySelectorAll(
      ".sclastestpost .sclastestpost__posts .sclastestpost__posts-paging li .pagenumber"
    );

    pageNumberList.forEach((pageNum) => {
      pageNum.parentElement.remove();
    });

    for (let i = 0; i < totalPageNumber; i++) {
      btnNext.insertAdjacentElement("beforebegin", createPageNumber(i + 1));
    }
    function createPageNumber(pageNum) {
      let pageNumber = document.createElement("li");
      let pageNumberAnchor = document.createElement("a");
      pageNumberAnchor.classList.add("pagenumber");
      pageNumber.appendChild(pageNumberAnchor);
      pageNumber.querySelector("a").innerHTML = pageNum;
      return pageNumber;
    }
  }

  function resetPost(postsList, numPage = 1) {
    let pageNumberList = document.querySelectorAll(
      ".sclastestpost .sclastestpost__posts .sclastestpost__posts-paging li .pagenumber"
    );
    postsList.forEach((post, postId) => {
      postId + 1 === numPage
        ? post.classList.add("--active")
        : post.classList.remove("--active");
    });
    pageNumberList.forEach((pageNum) => {
      Number(pageNum.innerText) === numPage
        ? pageNum.classList.add("--current")
        : pageNum.classList.remove("--current");
    });
  }

  function clickPageNumbers(postsList) {
    resetPost(postsList);
    let pageNumberList = document.querySelectorAll(
      ".sclastestpost .sclastestpost__posts .sclastestpost__posts-paging li .pagenumber"
    );
    pageNumberList.forEach((pageNum) => {
      pageNum.addEventListener("click", () => {
        let selectedPageNum = Number(pageNum.innerText);
        postsList.forEach((post, postId) => {
          postId + 1 === selectedPageNum
            ? post.classList.add("--active")
            : post.classList.remove("--active");
        });
        pageNumberList.forEach((pageNum) =>
          pageNum.classList.remove("--current")
        );
        pageNum.classList.add("--current");
        handleButtonStatus();
      });
    });
  }
  function handleButtonStatus() {
    const btnNext = document.querySelector(
      ".sclastestpost .sclastestpost__posts .sclastestpost__posts-paging .btnnext"
    );
    const btnPrev = document.querySelector(
      ".sclastestpost .sclastestpost__posts .sclastestpost__posts-paging .btnprev"
    );
    const currentPageNum = Number(
      document.querySelector(
        ".sclastestpost .sclastestpost__posts .sclastestpost__posts-paging li .pagenumber.--current"
      ).innerText
    );
    const totalPageNumber = Number(
      document.querySelectorAll(
        ".sclastestpost .sclastestpost__posts .sclastestpost__posts-paging li .pagenumber"
      ).length
    );
    if (currentPageNum === 1) {
      btnPrev.classList.add("--disabled");
      btnPrev.setAttribute("disabled", true);
    } else {
      btnPrev.classList.remove("--disabled");
      btnPrev.setAttribute("disabled", false);
    }
    if (currentPageNum === totalPageNumber) {
      btnNext.classList.add("--disabled");
      btnNext.setAttribute("disabled", true);
    } else {
      btnNext.classList.remove("--disabled");
      btnNext.setAttribute("disabled", false);
    }
  }

  window.addEventListener("load", () => {
    let postsListActive = document.querySelectorAll(
      ".sclastestpost .sclastestpost__posts .sclastestpost__posts-list.--active"
    );
    showPageNumbers();
    clickPageNumbers(postsListActive);
    handleButtonStatus();
  });
}

/* 
------------------------------------------------------
................FAQ SECTION CONTACT US PAGE...........
------------------------------------------------------
*/
// TODO12: Accordian
function handleAccordian() {
  contentList.forEach((content) => {
    // Click button
    const showBtn = content.querySelector(".title .icon");
    content.addEventListener("click", () => {
      showBtn.classList.toggle("--active");
      const text = content.querySelector(".text");
      // Check if active
      if (showBtn.classList.contains("--active")) {
        text.style.maxHeight = `${text.querySelector("p").scrollHeight}px`;
      } else {
        text.style.maxHeight = 0;
      }
    });
  });
}
handleAccordian();

// TODO13: Form contact
function handleFormContact() {
  const textInputsGetInTouch = document.querySelectorAll(
    ".scgetintouch .scgetintouch__form .scgetintouch__form-wrapper .formrow .formgroup input[type='text']"
  );
  const textAreaGetInTouch = document.querySelector(
    ".scgetintouch .scgetintouch__form .scgetintouch__form-wrapper .formrow .formgroup textarea"
  );
  const btnSubmitGetInTouch = document.querySelector(
    ".scgetintouch .scgetintouch__form .scgetintouch__form-wrapper .btnsubmit "
  );
  if (
    typeof textInputsGetInTouch != "undefined" &&
    textInputsGetInTouch != null &&
    typeof textAreaGetInTouch != "undefined" &&
    textAreaGetInTouch != null &&
    typeof btnSubmitGetInTouch != "undefined" &&
    btnSubmitGetInTouch != null
  ) {
    // Handle Submit
    function handleBtnSubmit() {
      // Handle Typing
      function handleType(input) {
        input.addEventListener("focusin", () => {
          input.parentElement.classList.remove("--active");
        });
        input.addEventListener("keyup", (e) => {
          input.parentElement.classList.add("--active");
          input.parentElement.classList.remove("--error");
          input.setAttribute("value", e.target.value);
        });
      }
      handleType(textAreaGetInTouch);
      textInputsGetInTouch.forEach((textInput) => handleType(textInput));
      // Handle error
      function handleError(input) {
        if (
          input.getAttribute("value") == null ||
          input.getAttribute("value") == ""
        ) {
          input.parentElement.classList.add("--error");
        } else {
          input.parentElement.classList.remove("--error");
        }
      }
      // Button submit
      btnSubmitGetInTouch.addEventListener("click", (e) => {
        e.preventDefault();
        handleError(textAreaGetInTouch);
        textInputsGetInTouch.forEach((textInput) => {
          if (textInput.id !== "company") {
            handleError(textInput);
            if (textInput.id === "email") {
              if (
                validateEmail(textInput.getAttribute("value")) === null &&
                textInput.getAttribute("value") != null &&
                textInput.getAttribute("value") != ""
              ) {
                textInput.nextElementSibling.innerText =
                  "Email invalid. Please try again!";
                textInput.parentElement.classList.add("--error");
              } else {
                textInput.nextElementSibling.innerText =
                  "Please fill in this field";
              }
            }
          }
        });
        const totalError = document.querySelectorAll(
          ".scgetintouch .scgetintouch__form .scgetintouch__form-wrapper .formrow .formgroup.--error"
        ).length;
        if (totalError === 0) {
          window.alert("Send message successful!");
        }
      });
    }
    handleBtnSubmit();
  }
}
handleFormContact();

/* 
------------------------------------------------------
......................TOKEN PAGE......................
------------------------------------------------------
*/
// TODO14: Token
function handleToken() {
  const tokenSectionDesktop = document.querySelector(".sctokens");
  if (
    typeof tokenSectionDesktop != "undefined" &&
    tokenSectionDesktop != null
  ) {
    const tokenSectionMobile = document.querySelector(".sctokensmobile");

    function changeTokenSectionHTML() {
      if (window.innerWidth <= 767.98) {
        tokenSectionMobile?.classList.remove("--hide");
        tokenSectionDesktop?.classList.add("--hide");
      } else {
        tokenSectionMobile?.classList.add("--hide");
        tokenSectionDesktop?.classList.remove("--hide");
      }
    }
    window.addEventListener("load", changeTokenSectionHTML);
    window.addEventListener("resize", changeTokenSectionHTML);
  }
}
handleToken();
