const express = require('express');
const Docxtemplater = require('docxtemplater');
const JSZip = require('jszip');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

function estateWordDoc (data) {

let content = fs.readFileSync(path.resolve(__dirname, 'docxGen.docx'), 'binary');

let zip = new JSZip(content);

let doc = new Docxtemplater();

    doc.loadZip(zip);

    doc.setData({
      fname: data.fname,
      lname: data.lname,
      mname: data.mname,
      suffix: data.suffix,
      socialsec: data.socialsec,
      address: data.address,
      telephone: data.telephone,
      wtelephone: data.wtelephone,
      dob: data.dob,
      yrsTexas: data.yrsTexas,
      sp_firstName: data.sp_firstName,
      sp_lastName: data.sp_lastName,
      sp_middleName: data.sp_middleName,
      sp_socialSecurity: data.sp_socialSecurity,
      sp_address: data.sp_address,
      sp_telephone: data.sp_telephone,
      sp_wtelephone: data.sp_wtelephone,
      sp_dob: data.sp_dob,
      marriageDate: data.marriageDate,
      fst_child_fname: data.fst_child_fname,
      fst_child_lastName: data.fst_child_lastName,
      fst_child_middleName: data.fst_child_middleName,
      fst_child_socialSecurity: data.fst_child_socialSecurity,
      fst_child_address: data.fst_child_address,
      fst_child_telephone: data.fst_child_telephone,
      fst_child_wtelephone: data.fst_child_wtelephone,
      fst_child_dob: data.fst_child_dob,
      fst_child_pob: data.fst_child_pob,
      fst_child_spouse: data.fst_child_spouse,
      fst_child_childrenNum: data.fst_child_childrenNum,
      fst_child_chldrnNames: data.fst_child_chldrnNames,
      fst_child_chldrnAges: data.fst_child_chldrnAges,
      secnd_child_fname: data.secnd_child_fname,
      secnd_child_lastName: data.secnd_child_lastName,
      secnd_child_middleName: data.secnd_child_middleName,
      secnd_child_socialSecurity: data.secnd_child_socialSecurity,
      secnd_child_address: data.secnd_child_address,
      secnd_child_telephone: data.secnd_child_telephone,
      secnd_child_wtelephone: data.secnd_child_wtelephone,
      secnd_child_dob: data.secnd_child_dob,
      secnd_child_pob: data.secnd_child_pob,
      secnd_child_spouse: data.secnd_child_spouse,
      secnd_child_childrenNum: data.secnd_child_childrenNum,
      secnd_child_chldrnNames: data.secnd_child_chldrnNames,
      secnd_child_chldrnAges: data.secnd_child_chldrnAges,
      third_child_fname: data.third_child_fname,
      third_child_lastName: data.third_child_lastName,
      third_child_middleName: data.third_child_middleName,
      third_child_socialSecurity: data.third_child_socialSecurity,
      third_child_address: data.third_child_address,
      third_child_telephone: data.third_child_telephone,
      third_child_wtelephone: data.third_child_wtelephone,
      third_child_dob: data.third_child_dob,
      third_child_pob: data.third_child_pob,
      third_child_spouse: data.third_child_spouse,
      third_child_childrenNum: data.third_child_childrenNum,
      third_child_chldrnNames: data.third_child_chldrnNames,
      third_child_chldrnAges: data.third_child_chldrnAges,
      prev_married: data.prev_married,
      prev_spouse: data.prev_spouse,
      prev_children: data.prev_children,
      prev_terminated: data.prev_terminated,
      prev_obligation: data.prev_obligation,
      additional_childrn: data.additional_childrn,
      currentWill: data.currentWill,
      excd600: data.excd600,
      ownRealEstate: data.ownRealEstate,
      ownStkBnds: data.ownStkBnds,
      ownDebt1000: data.ownDebt1000,
      lifeInsurance: data.lifeInsurance,
      retirementPlans: data.retirementPlans,
      expectInheritance: data.expectInheritance,
      majorAssets: data.majorAssets,
      majorDebts: data.majorDebts,
      primaryIncome: data.primaryIncome,
      fst_desItem: data.fst_desItem,
      fst_item_heir: data.fst_item_heir,
      fst_heir_relation: data.fst_heir_relation,
      sec_desItem: data.sec_desItem,
      sec_item_heir: data.sec_item_heir,
      sec_heir_relation: data.sec_heir_relation,
      third_desItem: data.third_desItem,
      third_item_heir: data.third_item_heir,
      third_heir_relation: data.third_heir_relation,
      fst_balance_heir: data.fst_balance_heir,
      fst_percent: data.fst_percent,
      fst_blnc_heir_relation: data.fst_blnc_heir_relation,
      fst_blnc_heir_heir: data.fst_blnc_heir_heir,
      fst_blnc_heir_heir_relation: data.fst_blnc_heir_heir_relation,
      sec_balance_heir: data.sec_balance_heir,
      sec_percent: data.sec_percent,
      sec_blnc_heir_relation: data.sec_blnc_heir_relation,
      wantTrust: data.wantTrust,
      primary_exec: data.primary_exec,
      primary_exec_social_sec: data.primary_exec_social_sec,
      primary_exec_address: data.primary_exec_address,
      primary_exec_phone: data.primary_exec_phone,
      primary_exec_w_phone: data.primary_exec_w_phone,
      primary_exec_relation: data.primary_exec_relation,
      primary_exec_bond_waived: data.primary_exec_bond_waived,
      primary_exec_paid: data.primary_exec_paid,
      alt_exec: data.alt_exec,
      alt_exec_social_sec: data.alt_exec_social_sec,
      alt_exec_address: data.alt_exec_address,
      alt_exec_phone: data.alt_exec_phone,
      alt_exec_w_phone: data.alt_exec_w_phone,
      alt_exec_relation: data.alt_exec_relation,
      alt_exec_bond_waived: data.alt_exec_bond_waived,
      alt_exec_paid: data.alt_exec_paid,
      primary_guardian: data.primary_guardian,
      primary_guardian_social_sec: data.primary_guardian_social_sec,
      primary_guardian_address: data.primary_guardian_address,
      primary_guardian_phone: data.primary_guardian_phone,
      primary_guardian_w_phone: data.primary_guardian_w_phone,
      primary_guardian_relationship: data.primary_guardian_relationship,
      alt_guardian: data.alt_guardian,
      alt_guardian_social_sec: data.alt_guardian_social_sec,
      alt_guardian_address: data.alt_guardian_address,
      alt_guardian_phone: data.alt_guardian_phone,
      alt_guardian_w_phone: data.alt_guardian_w_phone,
      alt_guardian_relationship: data.alt_guardian_relationship,
      primary_trustee: data.primary_trustee,
      primary_trustee_social_sec: data.primary_trustee_social_sec,
      primary_trustee_address: data.primary_trustee_address,
      primary_trustee_phone: data.primary_trustee_phone,
      primary_trustee_w_phone: data.primary_trustee_w_phone,
      primary_trustee_relationship: data.primary_trustee_relationship,
      primary_trustee_paid: data.primary_trustee_paid,
      alt_trustee: data.alt_trustee,
      alt_trustee_social_sec: data.alt_trustee_social_sec,
      alt_trustee_address: data.alt_trustee_address,
      alt_trustee_phone: data.alt_trustee_phone,
      alt_trustee_w_phone: data.alt_trustee_w_phone,
      alt_trustee_relationship: data.alt_trustee_relationship,
      alt_trustee_paid: data.alt_trustee_paid,
      addtionalInfo: data.addtionalInfo
    });
      try {
          doc.render()
      }
      catch (error) {
          var e = {
              message: error.message,
              name: error.name,
              stack: error.stack,
              properties: error.properties,
          }
          console.log(JSON.stringify({error: e}));
          throw error;
      }
      var buf = doc.getZip()
                   .generate({type: 'nodebuffer'});
      fs.writeFileSync(path.resolve(__dirname + '/doc-sender-catcher', 'output.docx'), buf)
    };

module.exports = {estateWordDoc};
