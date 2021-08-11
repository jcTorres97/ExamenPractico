using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BaseWeb.Extensiones
{
    public class LayoutAttribute : ResultFilterAttribute
    {
        /// <summary>
        ///     Specifies the file that will be loaded as the main layout for the rendered view.
        /// </summary>
        public string Layout { get; set; }

        /// <summary>
        ///     Initialize the attribute with the specified <paramref name="layout" /> files to be used for rendering view pages.
        /// </summary>
        /// <param name="layout"></param>
        public LayoutAttribute(string layout) => Layout = layout;

        public override void OnResultExecuting(ResultExecutingContext context)
        {
            // We only want to attempt to override if the know this call is for rendering the view
            if (context.Result is ViewResult viewResult)
            {
                // Set the Layout value to whatever was passed in
                viewResult.ViewData["Layout"] = Layout;
            }
        }
    }
}
