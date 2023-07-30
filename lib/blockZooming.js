export const blockZooming = () => {
  document.addEventListener(
    "mousewheel",
    function (e) {
      if (!e.ctrlKey && !e.metaKey) return;

      e.preventDefault();
      e.stopImmediatePropagation();
    },
    { passive: false }
  );

  // отключение zoom прикосновениями (в том числе трекападами и т.п.) в Safari и iOS
  document.addEventListener(
    "gesturestart",
    function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
    },
    { passive: false }
  );

  // отключение zoom через клавиатуру (ctrl + "+", ctrl + "-")
  // кнопки браузера для управления zoom отключены не будут
  document.addEventListener(
    "keydown",
    function (e) {
      if (!e.ctrlKey && !e.metaKey) return;
      if (e.keyCode != 189 && e.keyCode != 187) return;

      e.preventDefault();
      e.stopImmediatePropagation();
    },
    { passive: false }
  );
};
