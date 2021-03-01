package com.dexlock.ft.application.resources;

import org.eclipse.jetty.http.HttpStatus;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


public class CORSFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        String method = ((HttpServletRequest) servletRequest).getMethod();

        try {
            if (servletResponse instanceof HttpServletResponse) {
                HttpServletResponse httpResponse = (HttpServletResponse) servletResponse;
                httpResponse.setHeader("Access-Control-Allow-Credentials", "true");
                httpResponse.setHeader("Access-Control-Allow-Headers", "Content-Type , Accept, Authorization");
                httpResponse.setHeader("Access-Control-Allow-Methods", "OPTIONS,GET,PUT,POST,DELETE,HEAD,PATCH");
                httpResponse.setHeader("Access-Control-Allow-Origin", "*");
                httpResponse.setHeader("Access-Control-Max-Age", "3600");

                if (!method.equalsIgnoreCase("OPTIONS")) {
                    filterChain.doFilter(servletRequest, servletResponse);
                }
            }
        } catch (Exception e) {
            HttpServletResponse httpResponse = (HttpServletResponse) servletResponse;
            httpResponse.setStatus(HttpStatus.BAD_REQUEST_400);
            httpResponse.getWriter().print("This is a bad request");
        }
    }

    @Override
    public void destroy() {

    }

}


