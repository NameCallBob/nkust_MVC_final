// mainpage()
export class Page_Content {

mainpage(what){
 
    let p = `
    <div class="jumbotron jumbotron-fluid" style="margin-bottom:0" >
    <div class="container">
        <!-- title -->
      <p><h1>Welcome <br> 彬彬炸雞店</h1></p>
    </div>
</div>
    <!-- menu -->
    <nav class="navbar navbar-expand-sm navbar-dark bg-dark" style="text-align:center;">
        <div class="collapse navbar-collapse justify-content-center" id="collapsibleNavbar" style="margin-left: 10px; margin-right: 10px;">
          <ul class="navbar-nav mx-2 mb-lg-0 px-5" style="border-spacing: 10px;">
            <li class="nav-item">
              <h4><a class="nav-link"  name='nav_func'>關於我</a></h4>
            </li>
            <li class="nav-item">
              <h4><a class="nav-link" name='nav_func' >菜單</a></h4>
            </li>
            <li class="nav-item">
              <h4><a class="nav-link" name='nav_func' >登入</a></h4>
            </li>
            <li class="nav-item">
            <h4><a class="nav-link" name='nav_func' >購物車</a></h4>
          </li>
          <li class="nav-item">
            <h4><a class="nav-link" name='nav_func'></a></h4>
          </li>
          
          </ul>
        </div>  
    </nav>
    
    `;
    if(what == 'food'){
        p = p + Page_Content.food();
    }   
    else if (what == 'login'){
        p = p + Page_Content.login();
    }
    else if (what == 'register'){
        p = p + Page_Content.register();
    }
    else if (what == 'car'){
      p = p + Page_Content.shopping_car();
    }
    else if (what == 'manage'){
      p = p + Page_Content.manage();
    }
    else if (what == 'com'){
      p = p + Page_Content.manageforcom();
    }
    else if (what == 'com_manage'){
      p = p + Page_Content.com_manage();
    }
    else{
      console.log('Page content not found')
    }
    return p 
}


static food(){
    const p = `
    <div class="container" style="margin-top: 30px;;">
  <h2>菜單</h2>

  <p>不定時增加新品喔~</p>
<!-- 導航 -->
  <ul class="nav nav-tabs "  role="tablist">
    <li class="nav-item"  role="presentation">
      <button class="nav-link" name="fd-type"  data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="false">全部</button>
    </li>
    <li class="nav-item"  role="presentation">
      <button class="nav-link" name="fd-type"  data-bs-target="#meat" type="button" role="tab" aria-controls="meat" aria-selected="false">肉類</button>
    </li>
    <li class="nav-item"  role="presentation">
      <button class="nav-link" name="fd-type"  data-bs-target="#veg" type="button" role="tab" aria-controls="veg" aria-selected="false">蔬菜</button>
    </li>
    <li class="nav-item"  role="presentation">
        <button class="nav-link" name="fd-type"  data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">其他</button>
      </li>
      <li class="nav-item"  role="presentation">
        <button class="nav-link" name="fd-type"  data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">飲品</button>
      </li>
  </ul>
  <div class="tab-content" id="myTabContent">
    <div class="tab-pane fade show active" name="list-fd-content" role="tabpanel" aria-labelledby="home-tab">
        <table class="table table-hover table-borderless">
            <thead>
              <tr class="table-dark">
                <th>品名</th>
                <th>單價</th>
                <th colspan="3">功能</th>
              </tr>
            </thead>
            <tbody id="list-content">
            </tbody>
          </table>
    </div>
  </div>
<!-- 導航END -->

</div>
    `
    return p
}

static login(){
  const p = `
  <div style="margin-top: 30px;">
  <span class="">
    <div class="container py-6 h-100 w-100 p-3 " >
      <div class="row d-flex justify-content-center align-items-center h-100 ">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card shadow-2-strong" style="border-radius: 1rem;">
            <div class="card-body p-5 text-center">
  
              <h3 class="mb-5"><b>登入</b></h3>
              <div class="form-outline mb-4">
                <label class="form-label" for="Account">帳號 Account</label>
                <input type="email" id="Account" class="form-control form-control-lg" />
              </div>
  
              <div class="form-outline mb-4">
                <label class="form-label" for="Password">密碼 Password</label>
                <input type="password" id="Password" class="form-control form-control-lg" />
              </div>

              <button class="btn btn-primary btn-lg btn-block" type="submit" id="login">登入</button>
              <p id="wrong" style="color: red;margin-top: 5px;"></p>
              <hr class="my-4">
              <p>沒帳號嗎?</p>
              <button class="btn btn-lg btn-block btn-primary mb-2" style="background-color: #3b5998;"
                type="submit" id="register"><i class="fab fa-facebook-f me-2" ></i>註冊</button>
  
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `
  return p 
}

static register(){
  const p =`
  <section class="gradient-custom">
  <div class="container py-5 h-100">
    <div class="row justify-content-center align-items-center h-100">
      <div class="col-12 col-lg-9 col-xl-7">
        <div class="card shadow-2-strong card-registration" style="border-radius: 15px;">
          <div class="card-body p-4 p-md-5">
            <h3 class="mb-4 pb-2 pb-md-0 mb-md-5">註冊</h3>
            <form>

              <div class="row">
                <div class="col-md-6 mb-4">

                  <div class="form-outline">
                    <input type="text" name="reg_data" class="form-control form-control-lg" />
                    <label class="form-label" for="">帳號 Account</label>
                  </div>

                </div>
                <div class="col-md-6 mb-4">

                  <div class="form-outline">
                    <input type="text" name="reg_data" class="form-control form-control-lg" />
                    <label class="form-label" for="">密碼 Password</label>
                  </div>

                </div>
              </div>

              <div class="row">
                <div class="col-md-6 mb-4 d-flex align-items-center">

                  <div class="form-outline datepicker w-100">
                    <input type="text" class="form-control form-control-lg" name="reg_data" />
                    <label for="birthdayDate" class="form-label">姓名 Name</label>
                  </div>

                </div>
                <div class="col-md-6 mb-4">

                  <div class="form-outline datepicker w-100">
                    <input type="date" class="form-control form-control-lg" name="reg_data" />
                    <label for="birthdayDate" class="form-label">生日 birthday</label>
                  </div>
                
                </div>
              </div>

              <div class="row">
                <div class="col-md-6 mb-4 pb-2">

                  <div class="form-outline">
                    <input type="email" name="reg_data" class="form-control form-control-lg" />
                    <label class="form-label" for="">電子郵件 Email</label>
                  </div>

                </div>
                <div class="col-md-6 mb-4 pb-2">

                  <div class="form-outline">
                    <input type="tel" name="reg_data"class="form-control form-control-lg" />
                    <label class="form-label" for="">行動電話 Phone</label>
                  </div>

                </div>
              </div>

              <div class="row">
                <div class="col-12">
                  <input type="text" name="reg_data"class="form-control form-control-lg" />
                  <label class="form-label" for="">地址 address</label>
                </div>
              </div>

              <div class="mt-4 pt-2">
                <input class="btn btn-primary btn-lg" id='submit' type="submit" value="送出!">
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  `
  return p 
}

static shopping_car(){
  const p = `
  <div class="container" style="margin-top: 5px;">
  <div class="table-responsive">
    <table class="table w-100">
      <thead>
        <tr>
          <th scope="col" class="border-0 bg-light align-middle">
            <div class="p-2 px-3 text-uppercase"><b>商品</b></div>
          </th>
          <th scope="col" class="border-0 bg-light align-middle">
            <div class="py-2 text-uppercase"><b>數量</b></div>
          </th>
          <th scope="col" class="border-0 bg-light align-middle">
            <div class="py-2 text-uppercase"></div>
          </th>
        </tr>
      </thead>
      <tbody id="show">
      
      </tbody>
    </table>
    
  </div>

  </div>
  `
  return p
}

static manage(){
const p =   `
<div class="container" style="margin-top: 5px;">
<div class="tab-content">
<button type="button" class="btn btn-outline-primary"  style="margin-top:10px;" id="search_for_order">訂單查詢</button> &nbsp; &nbsp;
<button type="button" class="btn btn-outline-primary"  style="margin-top:10px;" id="myinfo">客戶資料</button>
<table class="table w-100 " id="show" style="margin-top:10px;">
 
</table>
</div>
</div>
`
return p 
}
static com_manage (){
  const p = `
  <div class="container" style="margin-top: 5px;">
<div class="tab-content">
<table class="table w-100 " id="show" style="margin-top:10px;">
</table>
</div>
</div>
  `
  return p 
}
/**
 * 停用 -　管理工作人員
 */
static manageforcom(){
  const p = `
  <div class="container">
  <table class="table table-hover">
    <thead>
      <tr>
        <th scope="col">帳號</th>
        <th scope="col">密碼</th>
        <th scope="col">Last</th>
        <th scope="col">Handle</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row"> 
          <ul class="action-list">
          <li><a href="#" class="btn btn-primary" name="chageit"><i class="fa-solid fa-pencil"></i></a></li>
          <li><a href="#" class="btn btn-danger"><i class="fa fa-times" name="delit"></i></a></li>
      </ul>
    </th>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
      </tr>
      <tr>
        <th scope="row">2</th>
        <td>Jacob</td>
        <td>Thornton</td>
        <td>@fat</td>
      </tr>
      <tr>
        <th scope="row">3</th>
        <td colspan="2">Larry the Bird</td>
        <td>@twitter</td>
      </tr>
    </tbody>
  </table>

  </div>
  `
  return p 
}
}
