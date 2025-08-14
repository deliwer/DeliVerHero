export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
};

export const scrollToTopInstant = () => {
  window.scrollTo(0, 0);
};

export const useScrollToTop = () => {
  return scrollToTop;
};