package com.taskmanager.web;
import com.taskmanager.domain.ProjectDetail;
import org.springframework.roo.addon.web.mvc.controller.scaffold.RooWebScaffold;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.roo.addon.web.mvc.controller.json.RooWebJson;

@RequestMapping("/projectdetails")
@Controller
@RooWebScaffold(path = "projectdetails", formBackingObject = ProjectDetail.class)
@RooWebJson(jsonObject = ProjectDetail.class)
public class ProjectDetailController {
}
