document.write(`
<nav class="navbar navbar-expand-lg navbar-light" style="background-color: #ffd700;">
    <a class="navbar-brand" href="#">顧客管理システム</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto mr-2">
            <li class="nav-item">
                <a class="nav-link" href="http://dev.marathon.rplearn.net/moka_sasaki/customer/add.html">追加</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="http://dev.marathon.rplearn.net/moka_sasaki/customer/list.html">一覧</a>
            </li>
        </ul>
    </div>
</nav>
<style>
    /* ナビゲーションバーのボタンをマウスオーバーしたときのスタイル */
    .navbar-nav .nav-link:hover {
        background-color: orange !important;
        color: white !important;
    }
</style>
`);
