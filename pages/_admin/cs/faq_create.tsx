import React, { useState } from 'react';
import { useMutation, useReactiveVar } from '@apollo/client';
import { Button, TextField, MenuItem, Select, InputLabel, FormControl, Stack, Box, Typography, OutlinedInput } from '@mui/material';
import withLayoutFull from '../../../libs/components/layout/LayoutFull';
import { CREATE_NOTICE } from '../../../apollo/admin/mutation';
import { NoticeInput } from '../../../libs/types/notice/notice.input';
import { FAQCategory, NoticeCategory } from '../../../libs/enums/notice.enum';
import { userVar } from '../../../apollo/store';
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from '../../../libs/sweetAlert';
import { Message } from '../../../libs/enums/common.enum';

const FaqCreate = () => {
    const user = useReactiveVar(userVar);
    const [insertNoticeData, setInsertNoticeData] = useState<NoticeInput>({
        noticeCategory: NoticeCategory.TERMS,
        noticeTitle: '',
        noticeContent: '', 
        faqCategory: FAQCategory.PRODUCT,
        noticeEventDate: '', 
    });
    const [createNotice] = useMutation(CREATE_NOTICE);

    const createFaqHandler = async () => {
        try {
            if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);
            const inputData = {
                noticeCategory: insertNoticeData.noticeCategory ? insertNoticeData.noticeCategory : NoticeCategory.FAQ,
                faqCategory: insertNoticeData.faqCategory ? insertNoticeData.faqCategory : undefined,
                noticeTitle: insertNoticeData.noticeTitle,
                noticeContent: insertNoticeData.noticeCategory === NoticeCategory.EVENT ? undefined : insertNoticeData.noticeContent,
                noticeEventDate: insertNoticeData.noticeCategory === NoticeCategory.EVENT ? insertNoticeData.noticeEventDate : undefined,
            };
            await createNotice({ variables: { input: inputData } });
            setInsertNoticeData({
                noticeCategory: NoticeCategory.TERMS,
                noticeTitle: '',
                noticeContent: '', 
                faqCategory: FAQCategory.PRODUCT,
                noticeEventDate: '', 
            });
            await sweetTopSmallSuccessAlert('Done')
        } catch (err: any) {
            await sweetErrorHandling(err);
        }
    };

    const noticeCategory = 'Category';
    const titleLabel = 
    insertNoticeData.noticeCategory === NoticeCategory.FAQ ? "Question" :
    insertNoticeData.noticeCategory === NoticeCategory.TERMS ? "Notice Title" :
    insertNoticeData.noticeCategory === NoticeCategory.EVENT ? "Event Title": 
    "Title";

    const contentLabel = 
        insertNoticeData.noticeCategory === NoticeCategory.FAQ ? 'Answer' :
        insertNoticeData.noticeCategory === NoticeCategory.EVENT ? "Input Event Date" :
        insertNoticeData.noticeCategory === NoticeCategory.TERMS ? "Notice Content" : 
        "Content"; 
    return (
        <div style={{width:'100%', height:'1300px', background:'#a5a4a4', justifyItems:'center'}}>
            <Stack sx={{ marginTop: '200px', width:'50%' }}>

            <InputLabel sx={{ color: 'white', marginLeft:'20px', marginBottom:'-5px', fontSize:'22px'}} shrink={true}>{noticeCategory}</InputLabel>
                <FormControl fullWidth sx={{ marginBottom: '20px' }}>
                    <Select
                        value={insertNoticeData.noticeCategory}
                        onChange={({ target: { value } }: any) => {
                            setInsertNoticeData({ 
                                ...insertNoticeData, 
                                noticeCategory: value,
                                noticeContent: value === NoticeCategory.EVENT ? '' : insertNoticeData.noticeContent, // Reset noticeContent if EVENT
                                noticeEventDate: value === NoticeCategory.EVENT ? insertNoticeData.noticeEventDate : '', // Keep noticeEventDate as it is
                            });
                        }}
                    >
                        {Object.values(NoticeCategory).map((category) => (
                            <MenuItem key={category} value={category}>
                                {category}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {insertNoticeData.noticeCategory === NoticeCategory.FAQ && (
                    <FormControl fullWidth sx={{ marginBottom: '20px' }}>
                        <InputLabel sx={{ color: 'white', marginLeft:'5px', marginTop:'-7px'}} >Type</InputLabel>
                        <Select
                            value={insertNoticeData.faqCategory || ''} 
                            onChange={({ target: { value } }: any) => {
                                setInsertNoticeData({ ...insertNoticeData, faqCategory: value });
                            }}
                        >
                            {Object.values(FAQCategory).map((faqCategory) => (
                                <MenuItem key={faqCategory} value={faqCategory}>
                                    {faqCategory}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}
                 <InputLabel sx={{ color: 'white', marginLeft:'20px', marginBottom:'-5px', fontSize:'22px'}} shrink={true}>{titleLabel}</InputLabel>
                <OutlinedInput
                    label={titleLabel}
                    onChange={({ target: { value } }: any) => {
                        setInsertNoticeData({ ...insertNoticeData, noticeTitle: value });
                    }}
                    value={insertNoticeData.noticeTitle}
                    sx={{ marginBottom: '25px', color:'black', background:'#a5a4a4', fontSize:'25px'}}
                   
                />
                 <InputLabel sx={{ color: 'white', marginLeft:'20px', marginBottom:'-5px', fontSize:'22px'}} shrink={true}>{contentLabel}</InputLabel>
                <OutlinedInput
                    label={contentLabel}
                    onChange={({ target: { value } }: any) => {
                        if (insertNoticeData.noticeCategory === NoticeCategory.EVENT) {
                            setInsertNoticeData({ 
                                ...insertNoticeData, 
                                noticeEventDate: value}) // Update noticeEventDate
                        } else {
                            setInsertNoticeData({ ...insertNoticeData, noticeContent: value }); // Update noticeContent
                        }
                    }}
                    value={insertNoticeData.noticeCategory === NoticeCategory.EVENT ? insertNoticeData.noticeEventDate : insertNoticeData.noticeContent} // Show noticeEventDate if EVENT
                    sx={{ marginBottom: '25px', color:'black', background:'#a5a4a4', fontSize:'25px' }}
                />
                <Box className={'submit-btn'} component={'div'}>
                <Button
                    className={'submit-review'}
                    disabled={
                        insertNoticeData.noticeTitle === '' || 
                        (insertNoticeData.noticeCategory === NoticeCategory.EVENT ? insertNoticeData.noticeEventDate === '' : insertNoticeData.noticeContent === '') || 
                        user?._id === ''
                    }
                    onClick={createFaqHandler}
                >
                    <Typography className={'title'} sx={{ color: 'black',  border: '1px solid black', padding:'6px 40px', borderRadius:'6px', background:'#44a1ed'}}>ADD</Typography>
                </Button>
                </Box>
            </Stack>
        </div>
       
    );
};

export default withLayoutFull(FaqCreate);
