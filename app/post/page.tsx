"use client";

import {
    Add as AddIcon,
    Close as CloseIcon,
    ExpandMore as ExpandMoreIcon,
    Send as SendIcon,
} from "@mui/icons-material";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Checkbox,
    Chip,
    Container,
    FormControl,
    FormControlLabel,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import useCreatePost from "@/app/hooks/useCreatePost";
import type React from "react";
import { useState } from "react";

type Post = {
    gameMode: string;
    requiredPlayers: number;
    tags?: string[];
    hasVoiceChat: boolean;
    discordUrl?: string;
    description: string;
    eventDateTime?: string;
    rankCap?: string;
    rankFloor?: string;
};

export type { Post };

export default function CreatePostPage() {
    const [formData, setFormData] = useState({
        gameMode: "",
        requiredPlayers: 1,
        tags: [] as string[],
        hasVoiceChat: false,
        discordUrl: "",
        description: "",
        eventDateTime: "",
        rankCap: "",
        rankFloor: "",
    });

    const [tagInput, setTagInput] = useState("");
    const { createPost, isLoading, error } = useCreatePost();

    const gameRanks = [
        "なし",
        "アイアン",
        "ブロンズ",
        "シルバー",
        "ゴールド",
        "プラチナ",
        "ダイヤモンド",
        "マスター",
        "グランドマスター",
        "チャレンジャー",
    ];
    const gameModes = [
        "スイフトプレイ",
        "ドラフトピック",
        "ランク (デュオ)",
        "ランク (フレックス)",
        "ランダムミッド",
        "ブロウル",
        "カスタム",
        "その他",
    ];

    const addTag = () => {
        if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
            setFormData((prev) => ({
                ...prev,
                tags: [...prev.tags, tagInput.trim()],
            }));
            setTagInput("");
        }
    };

    const removeTag = (tagToRemove: string) => {
        setFormData((prev) => ({
            ...prev,
            tags: prev.tags.filter((tag) => tag !== tagToRemove),
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log("投稿データ:", formData);

        // createPost hookを使用してAPIに投稿
        const result = await createPost(formData);

        if (result) {
            alert("投稿が作成されました！");
        } else {
            alert("投稿に失敗しました。");
        }
    };

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "grey.50", py: 4 }}>
            <Container maxWidth="md">
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 3,
                        bgcolor: "white",
                        p: 4,
                        borderRadius: 2,
                        boxShadow: 1,
                    }}
                >
                    募集
                    {/* 1. ゲームモード（最優先） */}
                    <FormControl fullWidth required>
                        <InputLabel>ゲームモード</InputLabel>
                        <Select
                            value={formData.gameMode}
                            label="ゲームモード"
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    gameMode: e.target.value,
                                }))
                            }
                            sx={{ minWidth: 200 }}
                        >
                            {gameModes.map((mode) => (
                                <MenuItem key={mode} value={mode}>
                                    {mode}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {/* 2. 募集人数 */}
                    <TextField
                        label="募集人数"
                        type="number"
                        value={formData.requiredPlayers}
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                requiredPlayers:
                                    Number.parseInt(e.target.value) || 1,
                            }))
                        }
                        fullWidth
                    />
                    {/* 3. タグ */}
                    <Box>
                        <Typography variant="subtitle1" gutterBottom>
                            タグ
                        </Typography>
                        <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                            <TextField
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                placeholder="タグを入力"
                                size="small"
                                onKeyPress={(e) =>
                                    e.key === "Enter" &&
                                    (e.preventDefault(), addTag())
                                }
                                sx={{ flexGrow: 1 }}
                            />
                            <IconButton onClick={addTag} color="primary">
                                <AddIcon />
                            </IconButton>
                        </Box>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                            {formData.tags.map((tag, index) => (
                                <Chip
                                    key={index}
                                    label={tag}
                                    onDelete={() => removeTag(tag)}
                                    deleteIcon={<CloseIcon />}
                                    variant="outlined"
                                />
                            ))}
                        </Box>
                    </Box>
                    {/* 4. ボイスチャット使用 */}
                    <Box className="flex">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formData.hasVoiceChat}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            hasVoiceChat: e.target.checked,
                                        }))
                                    }
                                />
                            }
                            label="ボイスチャット使用"
                        />

                        {/* Discord招待URL（ボイスチャット使用時のみ表示） */}
                        <TextField
                            label="Discord招待URL"
                            value={formData.discordUrl}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    discordUrl: e.target.value,
                                }))
                            }
                            placeholder="https://discord.gg/..."
                            fullWidth
                            disabled={!formData.hasVoiceChat}
                            sx={{
                                mt: 2,
                                opacity: formData.hasVoiceChat ? 1 : 0.5,
                                transition: "opacity 0.3s ease",
                            }}
                        />
                    </Box>
                    {/* 5. 説明 */}
                    <TextField
                        label="説明"
                        value={formData.description}
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                description: e.target.value,
                            }))
                        }
                        placeholder="追加の説明や注意事項があれば入力してください"
                        multiline
                        rows={3}
                        fullWidth
                    />
                    {/* 6. オプション設定（展開可能） */}
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="optional-settings-content"
                            id="optional-settings-header"
                        >
                            <Typography variant="subtitle1">
                                オプション設定
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 3,
                                }}
                            >
                                {/* イベント日時 */}
                                <TextField
                                    label="イベント日時"
                                    type="datetime-local"
                                    value={formData.eventDateTime}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            eventDateTime: e.target.value,
                                        }))
                                    }
                                    InputLabelProps={{ shrink: true }}
                                    fullWidth
                                />

                                {/* ランク制限 */}
                                <Grid container spacing={2}>
                                    <Grid item component="div">
                                        <FormControl fullWidth>
                                            <InputLabel>ランク下限</InputLabel>
                                            <Select
                                                value={formData.rankFloor}
                                                label="ランク下限"
                                                onChange={(e) =>
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        rankFloor:
                                                            e.target.value,
                                                    }))
                                                }
                                                sx={{ minWidth: 150 }}
                                            >
                                                {gameRanks.map((rank) => (
                                                    <MenuItem
                                                        key={rank}
                                                        value={rank}
                                                    >
                                                        {rank}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    <Grid item component="div">
                                        <FormControl fullWidth>
                                            <InputLabel>ランク上限</InputLabel>
                                            <Select
                                                value={formData.rankCap}
                                                label="ランク上限"
                                                onChange={(e) =>
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        rankCap: e.target.value,
                                                    }))
                                                }
                                                sx={{ minWidth: 150 }}
                                            >
                                                {gameRanks.map((rank) => (
                                                    <MenuItem
                                                        key={rank}
                                                        value={rank}
                                                    >
                                                        {rank}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                    {/* 送信ボタン */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            mt: 2,
                        }}
                    >
                        <Button
                            type="submit"
                            variant="contained"
                            startIcon={<SendIcon />}
                        >
                            投稿を作成
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}
