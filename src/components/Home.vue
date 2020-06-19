<template>
    <el-container class="home-container">
        <!--头部页面-->
        <el-header>
            <div>
                <img src="" alt="">
                <span>电商管理系统</span>
            </div>
            <el-button type="info" @click="logout">退出</el-button>
        </el-header>
        <!--页面主体-->
        <el-container>
            <!-- 侧边栏-->
            <el-aside :width="isCollapse ? '64px' : '200px'">
                <div class="toggle-button" @click="toggleCollapse">|||</div>
                <!-- 侧边栏菜单-->
                <el-menu
                        background-color="#333744"
                        text-color="#fff"
                        active-text-color="#409EFF"
                        unique-opened
                        :collapse="isCollapse" :collapse-transition="false"
                        router>
                    <!-- 一级菜单-->
                    <el-submenu :index="item.id +''" v-for="item in menulist" :key="item.id">
                        <template slot="title">
                            <!--图标-->
                            <i :class="iconsObj[item.id]"></i>
                            <!--文本-->
                            <span>{{item.authName}}</span>
                        </template>
                        <!--二级菜单-->
                        <el-menu-item :index="'/' + subItem.path + '' " v-for="subItem in item.children" :key="subItem.id">
                            <template slot="title">
                                <!-- 图标-->
                                <i class="el-icon-menu"></i>
                                <!--文本-->
                                <span>{{subItem.authName}}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <!--      右侧主体-->
            <el-main>
            <!--路由占位-->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        data(){
            return{
                menulist: [],
                iconsObj: {
                    '125': 'iconfont icon-user',
                    '103': 'iconfont icon-tijikongjian',
                    '101': 'iconfont icon-shangpin',
                    '102': 'iconfont icon-danju',
                    '145': 'iconfont icon-baobiao'
                },
                // 是否折叠
                isCollapse: false,
            }
        },
        created() {
            this.getMenuList()
            this.activePath = window.sessionStorage.getItem('activePath')
        },
        methods: {
            logout() {
                window.sessionStorage.clear()
                this.$router.push('/login')
            },
            async getMenuList() {
                const { data: res } = await this.$http.get('menus')
                if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
                this.menulist = res.data
                console.log(res)
            },
            // 点击按钮，切换菜单的折叠与展开
            toggleCollapse() {
                this.isCollapse = !this.isCollapse
            }
        }
    }
</script>

<style lang="less" scoped>
    .home-container {
        height: 100%;
    }

    .el-header {
        background-color: #373d41;
        display: flex;
        justify-content: space-between;
        padding-left: 0;
        align-items: center;
        color: #fff;
        font-size: 20px;

        > div {
            display: flex;
            align-items: center;

            span {
                margin-left: 15px;
            }
        }
    }

    .iconfont {
        margin-right: 10px;
    }

    .el-aside {
        background-color: #333744;
        .el-menu {
            border-right: none;
        }
    }

    .el-main {
        background-color: #eeedf1;
    }

    .toggle-button {
        background-color: #4a5064;
        font-size: 10px;
        line-height: 24px;
        color: #fff;
        text-align: center;
        letter-spacing: 0.2em;
        cursor: pointer;
    }
</style>
