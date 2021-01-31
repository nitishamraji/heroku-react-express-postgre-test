const SidebarNavItems = () => {
  return [
    {
      title: "Settings",
      to: "/settings",
      htmlBefore: '<i class="material-icons">settings</i>',
      htmlAfter: ""
    },
    {
      title: "News",
      htmlBefore: '<i class="material-icons">rss_feed</i>',
      to: "/news",
    },
    {
      title: "Stocks Screener",
      htmlBefore: '<i class="material-icons">equalizer</i>',
      to: "/screener",
    },
    {
      title: "Crypto",
      htmlBefore: '<i class="material-icons">view_module</i>',
      to: "/components-overview",
    },
    {
      title: "Watchlist",
      htmlBefore: '<i class="material-icons">table_chart</i>',
      to: "/tables",
    },
    {
      title: "User Profile",
      htmlBefore: '<i class="material-icons">person</i>',
      to: "/user-profile-lite",
    },
    {
      title: "Errors",
      htmlBefore: '<i class="material-icons">error</i>',
      to: "/errors",
    }
  ];
}

export default SidebarNavItems;
