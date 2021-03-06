# 预约系统
## 使用框架
* js全栈开发
* 前端-dva
* 后端-egg
## 主要功能需求
### 用户端：
1. （100%）推荐页：对部分店铺的推荐
2. （100%）搜索页：对用户搜索词进行模糊搜索，给出搜索的所有店铺
    - 交互细节：本身会有推荐店铺，在店铺搜索以后，会显示匹配的店铺有几个，并且展示对应的店铺的信息，结果店铺后面紧跟着推荐店铺
3. （100%）店铺详情页：包括用户登录，用户注册，订餐（通过对环境的筛选）,菜单展示
    - 头部有导航条，可以跳转回主界面，可以进行用户注册登录。
    - 关于登录：前端部分判断输入框是否为空，为空时登录按钮不可按动，后端判断用户密码是否匹配，不匹配就给用户提示密码或用户名错误
    - 关于注册：前端部分判断输入框是否为空，为空时登录按钮不可按动，后端判断用户是否已经存在，如果存在，给提示，如果不存在，注册成功
    - 预定功能：可以对环境、餐桌大小、时段进行筛选。右边显示有哪些餐桌，餐桌可点击（即用户选择餐桌，飘灰的餐桌不可点击），通过用户的筛选条件，将部分不符合要求的餐桌标灰，让其不可选择。用户点击预定的时候，对内容进行基本判断，用户名和联系方式需要存在，用户需要登录，不符合条件的地方，进行弹框提示。用户预定以后，向用户显示订单详情
    - 菜单展示，显示有哪些菜品，且将菜品进行分类。并且可以点击到对应的菜品详情页
4. （100%）菜品详情页：菜谱详情，用户评论
    - 菜品详情页是从菜单点击过来。头部有导航栏，可以返回店铺，可以用户登录，当用户评论的时候，如果用户是处在没有登录的状态在评论，则提示用户登录，如果用户在没有输入有效内容的情况情况下发表评论（如空白。只有空格、回车），则提示用户输入有效信息
5. （100%）新加细节：
    - 用户点击预约的时候，让用户确认是否预约 √
    - 给用户添加多订单界面，用于浏览和取消订单 √
    - 登录功能和注册功能增加二维码 √
6. （0）后期考虑增加的功能
    - 用户可以更换自己的头像 
    - 用户可以更换自己的密码 
    - 用户可以开店铺
    - 首页面的导航栏提供用户登录功能
### 店家：
1. （100%）对于店家，头像框多两个选择：第一跳到自己的店铺，第二查看店铺订单
2. （100%）对店铺名进行编辑
3. （100%）对店铺介绍进行编辑，对店铺封面图进行编辑
4. （100%）对店铺餐桌情况进行编辑
5. （100%）对店铺菜单分类，具体菜品，菜品价格，菜品图片进行编辑
6. （100%）用户评论页面，对菜品详情进行编辑
7. （100%）对于自家店铺订单可进行查看编辑
### 第三方：
1. （100%）操作界面单独搭建
2. （100%）店铺操作页：店铺的增加删除，店铺信息收集、编辑
    - 搜索展示所有店铺
    - 可删除店铺（如果该店铺有广告位，会要求先删除广告位）
    - 可增加店铺（会要求填写对应的店铺拥有者）
3. （100%）店铺广告位：对推荐页和搜索页上的广告进行替换更新
    - 界面显示目前广告位的店铺
    - 店铺之间可以拖拽来改变优先级
    - 广告位可删除
    - 点击增加广告位，出现弹框，通过搜索拿到对应广告，判断广告已经存在，存在则不可添加，不存在则可添加，且可批量添加
4. （100%）用户操作页
    - 界面可搜索用户
    - 创建用户
    - 可重置用户密码
    - 可删除用户
    - 查看用户订单，删除用户订单