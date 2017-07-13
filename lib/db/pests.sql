/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50610
Source Host           : localhost:3306
Source Database       : pests

Target Server Type    : MYSQL
Target Server Version : 50610
File Encoding         : 65001

Date: 2017-06-20 22:19:43
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for crops
-- ----------------------------
DROP TABLE IF EXISTS `crops`;
CREATE TABLE `crops` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `insertTime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `description` mediumtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of crops
-- ----------------------------
INSERT INTO `crops` VALUES ('1', '玉米', '2017-05-12 14:12:22', '玉米玉米玉米玉米玉米玉米玉米玉米玉米玉米玉米玉米玉米玉米玉米玉米玉米玉米玉米玉米玉米玉米');
INSERT INTO `crops` VALUES ('2', '大豆', '2017-05-12 16:49:52', '1');
INSERT INTO `crops` VALUES ('3', '小麦', '2017-05-12 16:49:55', '2');
INSERT INTO `crops` VALUES ('4', '花生', '2017-05-11 15:25:06', null);
INSERT INTO `crops` VALUES ('5', '水稻', '2017-05-11 16:09:55', null);
INSERT INTO `crops` VALUES ('6', '芝麻', '2017-05-11 16:10:40', null);
INSERT INTO `crops` VALUES ('7', '棉花', '2017-05-11 16:11:11', null);
INSERT INTO `crops` VALUES ('8', '油菜', '2017-05-11 16:12:23', null);
INSERT INTO `crops` VALUES ('9', '高粱', '2017-05-11 16:15:00', null);
INSERT INTO `crops` VALUES ('10', '大麻', '2017-05-11 16:35:10', null);
INSERT INTO `crops` VALUES ('12', '21', '0000-00-00 00:00:00', null);
INSERT INTO `crops` VALUES ('13', '212', '0000-00-00 00:00:00', null);
INSERT INTO `crops` VALUES ('14', '1212', '0000-00-00 00:00:00', null);
INSERT INTO `crops` VALUES ('15', '2121', '0000-00-00 00:00:00', null);
INSERT INTO `crops` VALUES ('16', '1', '2017-05-12 16:16:52', '1');

-- ----------------------------
-- Table structure for pests
-- ----------------------------
DROP TABLE IF EXISTS `pests`;
CREATE TABLE `pests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `alias` varchar(255) NOT NULL,
  `crops_id` int(11) NOT NULL,
  `insertTime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `description` mediumtext,
  PRIMARY KEY (`id`),
  KEY `crops_id` (`crops_id`) USING BTREE,
  CONSTRAINT `crops_id` FOREIGN KEY (`crops_id`) REFERENCES `crops` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of pests
-- ----------------------------
INSERT INTO `pests` VALUES ('1', '玉米螟', '1', '2017-05-10 10:15:25', '玉米螟俗称钻心虫，属鳞翅目、螟蛾科，是玉米的主要虫害。它可以危害玉米植株地上的各个部位。玉米螟一年一般发生2-4代，温度高、海拔低，发生代数较多。成虫夜间活动，飞翔能力强，有趋光性，寿命5-10天，喜欢在离地50厘米以上、生长较茂盛的玉米叶背面中脉两侧产卵。幼虫孵出后，初时聚集在一起，后在植株幼嫩部爬行，开始危害。初孵幼虫，能吐丝下垂，借风力飘落到邻株，形成转株危害。');
INSERT INTO `pests` VALUES ('2', '黏虫', '1', '2017-05-10 10:15:57', '黏虫俗称五彩虫、麦蚕，属鳞翅目夜蛾科。是粮食作物和牧草作物的主要害虫，危害玉米严重。黏虫是一种多食性、迁移性、暴发性的害虫。黏虫的发生与温度、湿度有密切关系。一般成虫产卵最适温度为19-25℃，30℃以上产卵受影响。另外湿度越大，越有利于成虫产卵，特别是在阴晴交错、多雨高湿的气候条件下，不但有利于成虫产卵，而且有利于卵的孵化和幼虫的成活发育');
INSERT INTO `pests` VALUES ('3', '棉铃虫', '1', '2017-05-10 10:16:06', '属鳞翅目、夜蛾科。别名钻心虫、青虫、棉铃实夜蛾等。');
INSERT INTO `pests` VALUES ('4', '蚜虫', '1', '2017-05-10 10:16:13', '可危害多种禾本科作物及杂草。苗期以成蚜、若蚜群集在心叶危害，抽穗后危害穗部，吸收汁液，妨碍生长，还能传播多种禾本科谷类病毒。其分泌物将花粉粘住，影响散粉。此外还能传播玉米矮花叶病毒病，造成不同程度的减产。');
INSERT INTO `pests` VALUES ('5', '玉米叶螨', '1', '2017-05-10 10:16:16', '俗称红蜘蛛，可危害多种作物，以成螨和若螨刺吸寄主叶背组织汁液，被害叶片由黄变白而枯死，影响玉米灌浆进程，致使千粒重下降，造成减产。');
INSERT INTO `pests` VALUES ('6', '锈病', '3', '2017-05-10 11:06:13', null);
INSERT INTO `pests` VALUES ('7', '赤霉病', '3', '2017-05-10 11:06:29', null);
INSERT INTO `pests` VALUES ('8', '大豆灰霉病', '2', '0000-00-00 00:00:00', null);
INSERT INTO `pests` VALUES ('9', '大豆蚜', '2', '0000-00-00 00:00:00', null);
INSERT INTO `pests` VALUES ('10', '大豆食心虫', '2', '0000-00-00 00:00:00', null);
INSERT INTO `pests` VALUES ('12', '22', '1', '2017-05-12 18:22:45', '22');
