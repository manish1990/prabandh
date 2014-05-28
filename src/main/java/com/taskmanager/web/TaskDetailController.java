package com.taskmanager.web;
import com.taskmanager.domain.TaskDetail;
import org.springframework.roo.addon.web.mvc.controller.json.RooWebJson;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.roo.addon.web.mvc.controller.scaffold.RooWebScaffold;
import org.springframework.roo.addon.web.mvc.controller.finder.RooWebFinder;

@RooWebJson(jsonObject = TaskDetail.class)
@Controller
@RequestMapping("/taskdetails")
@RooWebScaffold(path = "taskdetails", formBackingObject = TaskDetail.class)
@RooWebFinder
public class TaskDetailController {
}
