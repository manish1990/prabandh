package com.taskmanager.web;
import com.taskmanager.domain.AlertDetail;
import org.springframework.roo.addon.web.mvc.controller.scaffold.RooWebScaffold;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.roo.addon.web.mvc.controller.json.RooWebJson;
import org.springframework.roo.addon.web.mvc.controller.finder.RooWebFinder;

@RequestMapping("/alertdetails")
@Controller
@RooWebScaffold(path = "alertdetails", formBackingObject = AlertDetail.class)
@RooWebJson(jsonObject = AlertDetail.class)
@RooWebFinder
public class AlertDetailController {
}
