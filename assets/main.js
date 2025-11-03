/* ============================================================
   FIX FINAL – HAMBURGER MENU (Mobile & Fenêtre réduite)
   ============================================================ */
@media (max-width: 768px) {
  .nav ul {
    position: fixed;
    top: 65px;
    right: -100%;
    width: 80%;
    height: calc(100vh - 65px);
    background: #fffdf8;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 25px;
    transition: right 0.4s ease;
    box-shadow: -3px 0 15px rgba(0, 0, 0, 0.1);
    z-index: 999;
  }

  .nav ul.open {
    right: 0 !important;
  }

  .hamburger {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 26px;
    height: 20px;
    background: none;
    border: none;
    cursor: pointer;
    z-index: 1000;
  }

  .hamburger span {
    display: block;
    height: 3px;
    width: 100%;
    background: #333;
    border-radius: 3px;
    transition: all 0.3s ease;
  }

  .hamburger.is-active span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }

  .hamburger.is-active span:nth-child(2) {
    opacity: 0;
  }

  .hamburger.is-active span:nth-child(3) {
    transform: rotate(-45deg) translate(5px, -5px);
  }
}
